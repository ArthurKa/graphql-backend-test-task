// @ts-check
'use strict';

const { getImportNoUnresolvedRuleIgnoreArray } = require('./src/__eslintrc-helpers');

module.exports = ((/** @type {import('eslint').Linter.Config} */ e) => e)({
  extends: './node_modules/@arthurka/eslint',
  rules: {
    'import/no-unresolved': ['error', {
      ignore: getImportNoUnresolvedRuleIgnoreArray(__dirname),
    }],
    '@typescript-eslint/no-empty-interface': 'warn',
  },
});
