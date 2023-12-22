import fs from 'fs'
import path from 'path'
import yaml from 'yaml'
import markdownIt from 'markdown-it'

const CONFIG_FOLDER = './config/'

const converter = new markdownIt({
    html: true,
    linkify: true,
    breaks: true,
});

// Reads a config file from path (relative CONFIG_FOLDER) and returns the parsed yaml object
export function getConfig(loc: string): any {
    const configFile = path.resolve(CONFIG_FOLDER, loc);
    if (!fs.existsSync(configFile)) {
        console.warn(`WARNING: Config file ${loc} does not exist!`);
        return {};
    }
    const config = fs.readFileSync(configFile, {encoding: 'utf-8'});
    
    return yaml.parse(config, (key, value) => {
        if (typeof value === 'string') {
            // !include <file> will include the contents of <file> (relative to the current yml file) as a yaml object
            if (value.startsWith('!include ')) {
                return getConfig(path.resolve(configFile, '..', value.slice(9)));
            }
            // !file <file> will include the contents of <file> (relative to the current yml file) as a string
            if (value.startsWith('!file ')) {
                return fs.readFileSync(path.resolve(configFile, '..', value.slice(6)), {encoding: 'utf-8'});
            }
        }
        return value;
    });
}

export function parseMD(val: string): {__html: string} {
    return {__html: converter.render(val)};
}

export function parseMDInline(val: string): {__html: string} {
    return {__html: converter.renderInline(val)};
}