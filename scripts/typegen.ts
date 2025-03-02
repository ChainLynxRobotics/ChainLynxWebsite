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

function generateNestedInterfaces(
  obj: Record<string, unknown>,
  baseName: string
): { interfaces: string[]; type: string } {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return { interfaces: [], type: getTypeFromValue(obj) };
  }

  const properties: string[] = [];
  const nestedInterfaces: string[] = [];

  Object.entries(obj).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      properties.push(`  ${key}: any;`);
      return;
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      const nestedInterfaceName = `${baseName}${key.charAt(0).toUpperCase() + key.slice(1)}`;
      const nestedResult = generateNestedInterfaces(
        value as Record<string, unknown>,
        nestedInterfaceName
      );
      nestedInterfaces.push(...nestedResult.interfaces);
      properties.push(`  ${key}: ${nestedResult.type};`);
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        properties.push(`  ${key}: any[];`);
      } else {
        const firstItem = value[0];
        if (typeof firstItem === 'object' && !Array.isArray(firstItem)) {
          const arrayInterfaceName = `${baseName}${key.charAt(0).toUpperCase() + key.slice(1)}Item`;
          const arrayResult = generateNestedInterfaces(
            firstItem,
            arrayInterfaceName
          );
          nestedInterfaces.push(...arrayResult.interfaces);
          properties.push(`  ${key}: ${arrayResult.type}[];`);
        } else {
          properties.push(`  ${key}: ${getTypeFromValue(firstItem)}[];`);
        }
      }
    } else {
      properties.push(`  ${key}: ${getTypeFromValue(value)};`);
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

  const outputDir = outputFile.split('/').reverse().splice(1).reverse().join('/') + "/";
  
  try {
    fs.accessSync(outputDir, fs.constants.R_OK);
  }
  catch (error) {
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

  yamlFiles.forEach(file => {
    const filePath = path.join(configDir, file);

    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const parsedContent = yaml.parse(fileContent);


      const interfaceName = generateInterfaceName(file, interfacePrefix);
      const { interfaces } = generateNestedInterfaces(
        parsedContent,
        interfaceName
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
  console.log(`Types generated successfully in ${outputFile}`);
}

generateTypesFromYAML({
    configDir: './config',
    outputFile: './src/types/config.d.ts',
    interfacePrefix: 'I',
  });