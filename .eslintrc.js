module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true,
    node: true,
    mocha: true,
    es6: true
  },
  rules: {
    'comma-dangle': [
      2,
      'always-multiline',
    ],
    'no-param-reassign': 0,
    'no-console': 0,
    'no-mixed-operators': 0,
    'arrow-parens': 0,
    'no-plusplus': 0,
    'max-len': 0,
    'prefer-template': 0,
    'no-use-before-define': 0,
    'newline-per-chained-call': 0,
    'new-cap': 0,
    'semi': ['error', 'never'],
    'radix': ['error', 'as-needed'],
    'arrow-body-style': [
      2,
      'as-needed'
    ],
    "import/no-extraneous-dependencies": [
      "error", {
        "devDependencies": true
      }
    ],
  }
}
