// @ts-check
import eslint from '@eslint/js';
import js from '@eslint/js';
// eslint-disable-next-line
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import nodePlugin from 'eslint-plugin-n';
import globals from 'globals';
// @ts-expect-error cannot find types
import importPlugin from 'eslint-plugin-import/lib/index.js'; // Add this import

import { flatConfig as next } from '@next/eslint-plugin-next';
import prettierPlugin from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  {
    ignores: [
      '**/generateClient.cjs',
      '.next',
      'out',
      'dist',
      'bin',
      'build',
      'node_modules',
      'src/utils/tba',
      'public',
      'src/components/ui',
      '.git',
    ],
  },
  next.coreWebVitals,
  // @ts-expect-error eslint-plugin-next does not have types
  next.recommended,
  js.configs.recommended,
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  nodePlugin.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 'latest',
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      import: importPlugin, // Add the import plugin here
    },
    settings: {
      react: { version: 'detect' },
      // The import/resolver settings won't work in flat config - we'll handle it differently
    },
    rules: {
      ...next.recommended.rules,
      ...next.coreWebVitals.rules,
      'react/no-unknown-property': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 0,
      ...reactHooks.configs.recommended.rules,
      'n/no-missing-import': [
        'error',
        {
          tryExtensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.json5'],
        },
      ],
      'n/no-unsupported-features/node-builtins': [
        'warn',
        {
          ignores: ['localStorage', 'navigator.userAgent', 'navigator'],
        },
      ],
      'import/no-unresolved': 'error',
      '@next/next/no-img-element': 'off',
    },
  },
  // Add this custom config for handling TypeScript paths
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'import/no-unresolved': 'off', // Let TypeScript handle path resolution
      'n/no-missing-import': 'off', // Turn off node's import checking for TS files
    },
  },
  prettierPlugin
);
