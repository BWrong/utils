import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { babel } from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json' assert {type: 'json'};
const libName = 'authTool';
const banner = `/* libName: ${libName} version: ${pkg.version} author: ${pkg.author} */`;
const config = {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      plugins: [terser()],
      name: libName,
      banner,
      exports: 'auto'
    },
    {
      file: pkg.module,
      format: 'esm',
      name: libName,
      banner,
      exports: 'auto'
    }
  ],
  plugins: [
    nodeResolve(),
    typescript(),
    commonjs({ extensions: ['.js', '.ts'] }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled'
    })
  ],
  external: ['vue','vue-router']

  // globals:{},
};

export default config;
