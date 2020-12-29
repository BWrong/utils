import { babel } from '@rollup/plugin-babel';

const config = {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'esm'
  },
  plugins: [
    nodeResolve(),
    eslint(),
    commonjs(),
    babel({ babelHelpers: 'bundled' })
  ]
};

export default config;
