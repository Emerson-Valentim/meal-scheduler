module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'prettier'
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 12,
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'rules': {
    'quotes': [
      'error',
      'single'
    ],
    'indent': ['error', 2],
    'max-len': [2, 120, 4, {'ignoreUrls': true}],
    'no-multi-spaces': ['error'],
    'no-mixed-spaces-and-tabs': ['error'],
    'linebreak-style': ['error', 'unix'],
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0, 'maxBOF': 0 }],
    'no-trailing-spaces': ['error']
  },
};
