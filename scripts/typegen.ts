import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml';

interface TypeGeneratorOptions {
  configDir: string;
  outputFile: string;
  interfacePrefix?: string;
}

function getTypeFromValue(value: Array<unknown> | unknown): string {
  if (value === null) return 'any';
  if (typeof value === 'undefined') return 'any';
  const type = typeof value;
  switch (type) {
    case 'string':
      if (
        (typeof value === 'string' && value.startsWith('!include ')) ||
        (typeof value === 'string' && value.startsWith('!file ')) ||
        (typeof value === 'string' && value.includes('%'))
      ) {
        return 'string';
      }
      return 'string';
    case 'number':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'object':
      if (Array.isArray(value)) {
        if (value.length === 0) return 'any[]';
        const itemType = getTypeFromValue(value[0]);
        return `${itemType}[]`;
      }
      return 'any';
    default:
      return 'any';
  }
}

function generateInterfaceName(filename: string, prefix: string = 'I'): string {
  return `${prefix}${filename
    .replace(/\.ya?ml$/i, '')
    .replace(/[-_]/g, '')
    .replace(filename.charAt(0), filename.charAt(0).toUpperCase())}Config`;
}

/**
 * Analyzes a single YAML file to determine which fields in array items are optional
 * This focuses on consistency within the same file, not across different files
 */
function analyzeArrayItemConsistency(
  content: Record<string, unknown>
): Map<string, boolean> {
  const optionalFields = new Map<string, boolean>();

  // Find arrays in the YAML content
  function findArrays(obj: Record<string, unknown>, path: string = '') {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return;

    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key;

      if (Array.isArray(value) && value.length > 0) {
        // Handle arrays of objects - analyze their field consistency
        if (
          typeof value[0] === 'object' &&
          value[0] !== null &&
          !Array.isArray(value[0])
        ) {
          analyzeArrayItems(value as Record<string, unknown>[], currentPath);
        }
      } else if (typeof value === 'object' && value !== null) {
        // Continue recursive search
        findArrays(value as Record<string, unknown>, currentPath);
      }
    }
  }

  // Analyze array items for field consistency
  function analyzeArrayItems(
    items: Record<string, unknown>[],
    arrayPath: string
  ) {
    const allKeys = new Set<string>();
    const requiredKeys = new Set<string>();

    // First pass - collect all possible keys
    for (const item of items) {
      for (const key of Object.keys(item)) {
        allKeys.add(key);
      }
    }

    // Second pass - check which keys are present in all items
    for (const key of allKeys) {
      let presentInAll = true;

      for (const item of items) {
        if (!(key in item) || item[key] === undefined) {
          presentInAll = false;
          break;
        }
      }

      if (presentInAll) {
        requiredKeys.add(key);
      }
    }

    // Mark fields as optional or required
    for (const key of allKeys) {
      const fieldPath = `${arrayPath}[].${key}`;
      optionalFields.set(fieldPath, !requiredKeys.has(key));

      // Recursive check for nested objects in array items
      if (
        items[0] &&
        typeof items[0][key] === 'object' &&
        items[0][key] !== null
      ) {
        if (!Array.isArray(items[0][key])) {
          // For nested objects
          findArrays(
            items[0][key] as Record<string, unknown>,
            `${arrayPath}[].${key}`
          );
        }
      }
    }
  }

  findArrays(content);
  return optionalFields;
}

function generateNestedInterfaces(
  obj: Record<string, unknown>,
  baseName: string,
  fieldOptionalityMap: Map<string, boolean>,
  parentPath: string = ''
): { interfaces: string[]; type: string } {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return { interfaces: [], type: getTypeFromValue(obj) };
  }

  const properties: string[] = [];
  const nestedInterfaces: string[] = [];

  Object.entries(obj).forEach(([key, value]) => {
    const currentPath = parentPath ? `${parentPath}.${key}` : key;
    const arrayItemPath = parentPath.endsWith('[]')
      ? `${parentPath}.${key}`
      : '';

    // Check if this field should be optional
    // If it's a direct array item property, use the array path check
    let isOptional = false;
    if (arrayItemPath && fieldOptionalityMap.has(arrayItemPath)) {
      isOptional = fieldOptionalityMap.get(arrayItemPath) === true;
    }

    const propertyKey = isOptional ? `${key}?` : key;

    if (value === null || value === undefined) {
      properties.push(`  ${propertyKey}: any;`);
      return;
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      const nestedInterfaceName = `${baseName}${key.charAt(0).toUpperCase() + key.slice(1)}`;
      const nestedResult = generateNestedInterfaces(
        value as Record<string, unknown>,
        nestedInterfaceName,
        fieldOptionalityMap,
        currentPath
      );
      nestedInterfaces.push(...nestedResult.interfaces);
      properties.push(`  ${propertyKey}: ${nestedResult.type};`);
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        properties.push(`  ${propertyKey}: any[];`);
      } else {
        const firstItem = value[0];
        if (typeof firstItem === 'object' && !Array.isArray(firstItem)) {
          const arrayInterfaceName = `${baseName}${key.charAt(0).toUpperCase() + key.slice(1)}Item`;
          const arrayResult = generateNestedInterfaces(
            firstItem,
            arrayInterfaceName,
            fieldOptionalityMap,
            `${currentPath}[]`
          );
          nestedInterfaces.push(...arrayResult.interfaces);
          properties.push(`  ${propertyKey}: ${arrayResult.type}[];`);
        } else {
          properties.push(
            `  ${propertyKey}: ${getTypeFromValue(firstItem)}[];`
          );
        }
      }
    } else {
      properties.push(`  ${propertyKey}: ${getTypeFromValue(value)};`);
    }
  });

  const interfaceDefinition = `interface ${baseName} {\n${properties.join('\n')}\n}`;

  return {
    interfaces: [...nestedInterfaces, interfaceDefinition],
    type: baseName,
  };
}

function generateTypesFromYAML(options: TypeGeneratorOptions) {
  const { configDir, outputFile, interfacePrefix = 'I' } = options;

  const outputDir =
    outputFile.split('/').reverse().splice(1).reverse().join('/') + '/';

  try {
    fs.accessSync(outputDir, fs.constants.R_OK);
  } catch {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const yamlFiles = fs
    .readdirSync(configDir)
    .filter(file => /\.ya?ml$/i.test(file));

  const generatedInterfaces: string[] = [
    '// Auto-generated TypeScript interfaces from YAML config files',
    '// Generated at: ' + new Date().toISOString(),
  ];

  const configTypeMapEntries: string[] = [];

  // Process each file individually - don't try to group them
  yamlFiles.forEach(file => {
    try {
      const filePath = path.join(configDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const parsedContent = yaml.parse(fileContent);

      // Analyze array consistency within this specific file
      const fieldOptionalityMap = analyzeArrayItemConsistency(parsedContent);

      const interfaceName = generateInterfaceName(file, interfacePrefix);
      const { interfaces } = generateNestedInterfaces(
        parsedContent,
        interfaceName,
        fieldOptionalityMap
      );

      generatedInterfaces.push(...interfaces);
      configTypeMapEntries.push(`  '${file}': ${interfaceName};`);
    } catch (error) {
      console.error(`Error processing file ${file}:`, error);
    }
  });

  const configTypeMap = `interface ConfigTypeMap {\n${configTypeMapEntries.join('\n')}\n}`;
  generatedInterfaces.push(configTypeMap);

  fs.writeFileSync(outputFile, generatedInterfaces.join('\n\n'));
  // Adhere to formatting rules
  fs.writeFileSync(outputFile, '\n', { flag: 'a' });
  console.log(`Types generated successfully in ${outputFile}`);
}

// Run the type generator
generateTypesFromYAML({
  configDir: './config',
  outputFile: './src/types/config.d.ts',
  interfacePrefix: 'I',
});
