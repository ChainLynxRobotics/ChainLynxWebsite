import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import markdownIt from 'markdown-it';

const CONFIG_FOLDER = './config/';
const converter = new markdownIt({
  html: true,
  linkify: true,
  breaks: true,
});
export function getConfig<T extends keyof ConfigTypeMap>(
  loc: T
): ConfigTypeMap[T];
export function getConfig(loc: string): unknown {
  const configFile = path.resolve(CONFIG_FOLDER, loc);
  if (!fs.existsSync(configFile)) {
    console.warn(`WARNING: Config file ${loc} does not exist!`);
    return {};
  }
  const config = fs.readFileSync(configFile, { encoding: 'utf-8' });
  return yaml.parse(config, (key, value) => {
    if (typeof value === 'string') {
      if (value.startsWith('!include ')) {
        return getConfig(
          path.resolve(configFile, '..', value.slice(9)) as keyof ConfigTypeMap
        );
      } else if (value.startsWith('!file ')) {
        return fs.readFileSync(path.resolve(configFile, '..', value.slice(6)), {
          encoding: 'utf-8',
        });
      }
      else if (value.includes('%') && loc !== 'global.yml') {
        const globalConfig = getConfig('global.yml');
        return value.replace(/%(\w+)%/g, (match, key: keyof IGlobalConfig) => {
          return globalConfig[key] !== undefined ? globalConfig[key] : match;
        });
      }
    }
    return value;
  });
}

// Markdown renderers
export function parseMD(val: string): { __html: string } {
  return { __html: converter.render(val || '') };
}

export function parseMDInline(val: string): { __html: string } {
  return { __html: converter.renderInline(val || '') };
}