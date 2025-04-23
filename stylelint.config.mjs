// @ts-check

/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-sass-guidelines',
    'stylelint-prettier/recommended',
    'stylelint-config-tailwindcss',
    'prettier',
  ],
  plugins: ['stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    'import-notation': null,
    'at-rule-no-deprecated': [
      true,
      {
        ignoreAtRules: ['apply'],
      },
    ],
    'function-no-unknown': [
      true,
      {
        ignoreFunctions: ['theme'],
      },
    ],
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['plugin', 'custom-variant', 'theme'],
      },
    ],
  },
};
