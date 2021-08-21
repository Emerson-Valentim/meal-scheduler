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
    'max-len': [
      'error',
      {
        'code': 120,
        'tabWidth': 2,
        'ignoreTemplateLiterals': true
      }
    ],
    'no-multi-spaces': ['error'],
    'no-mixed-spaces-and-tabs': ['error'],
    'linebreak-style': ['error', 'unix'],
  },
};
