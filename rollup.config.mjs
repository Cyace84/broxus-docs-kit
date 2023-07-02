import { promises as fs } from 'fs';
import { builtinModules, createRequire } from 'module';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import alias from '@rollup/plugin-alias';
import dts from 'rollup-plugin-dts';
import vue from 'rollup-plugin-vue';
import scss from 'rollup-plugin-scss';
import css from 'rollup-plugin-css-only';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');

const DEV = !!process.env.DEV;
const PROD = !DEV;

const ROOT = fileURLToPath(import.meta.url);
const r = p => resolve(ROOT, '..', p);

const external = [
  ...Object.keys(pkg.dependencies),
  ...builtinModules.flatMap(m => (m.includes('punycode') ? [] : [m, `node:${m}`])),
  r('types/shared.d.ts'),
];
const plugins = [
  alias({
    entries: {
      'readable-stream': 'stream',
    },
  }),
  replace({
    // polyfill broken browser check from bundled deps
    'navigator.userAgentData': 'undefined',
    'navigator.userAgent': 'undefined',
    preventAssignment: true,
  }),
  // vue(),
  // scss(),
  // css({ output: 'bundle.css' }),
  commonjs(),
  nodeResolve({ preferBuiltins: false }),
  esbuild({ target: 'node14' }),
  json(),
];

const esmBuild = {
  input: [r('src/index.ts')],
  output: {
    format: 'esm',
    entryFileNames: `[name].js`,
    chunkFileNames: 'serve-[hash].js',
    dir: r('dist'),
    sourcemap: DEV,
  },
  external,
  plugins,
  onwarn(warning, warn) {
    if (warning.code !== 'EVAL') warn(warning);
  },
};

const nodeTypes = {
  input: r('src/index.ts'),
  output: {
    format: 'esm',
    file: 'dist/index.d.ts',
  },
  external,
  plugins: [dts({ respectExternal: true })],
};

export default [esmBuild, nodeTypes];
