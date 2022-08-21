import fs from 'fs';
import path from 'path';
import json5 from 'json5';
import { register } from 'tsconfig-paths';

interface CompilerOptions {
  outDir?: string;
  paths?: Record<string, string[]>;
}

const { outDir = '', paths = {} }: CompilerOptions = (
  json5
    .parse(fs.readFileSync(path.resolve('tsconfig.json'), 'utf-8'))
    .compilerOptions
);

register({
  baseUrl: path.resolve(outDir),
  paths,
});
