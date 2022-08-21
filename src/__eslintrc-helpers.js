// @ts-check
'use strict';

const fs = require('fs');
const path = require('path');
const json5 = require('json5');

module.exports = {
  /** @type {(e: string) => string[]} */
  getImportNoUnresolvedRuleIgnoreArray(dirPath) {
    /** @type {string} */
    const baseUrl = json5.parse(fs.readFileSync(path.join(dirPath, 'tsconfig.json'), 'utf-8')).compilerOptions.baseUrl;

    const baseUrlPath = path.join(dirPath, baseUrl);
    const list = fs.readdirSync(baseUrlPath);

    const folders = list.filter(e => fs.lstatSync(path.join(baseUrlPath, e)).isDirectory());
    const files = list.filter(e => !fs.lstatSync(path.join(baseUrlPath, e)).isDirectory());

    const preprocessedFiles = (
      files
        .map(e => path.parse(e))
        .filter(e => e.ext.match(/^\.[jt]sx?$/))
        .map(e => e.name)
    );

    return [
      `^(${[baseUrl, ...folders].join('|')})(/|$)`,
      `^(${preprocessedFiles.join('|')})$`,
    ];
  },
};
