module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'quotes': [1, "single"],
    'semi': [1, "never"],
    "space-before-function-paren": [1, "always"],
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
