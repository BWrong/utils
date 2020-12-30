module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 1,
    semi: 1,
    'prefer-const': 0,
    quotes: [1, 'single'],
    indent: 0,
    'object-shorthand': 1,
    // 'no-irregular-whitespace':0,
    camelcase: 1
  }
};
