const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = [
  {
    files: ['**/*.js'],
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    },
  },
  {
    ignores: ['**/*.min.js', '**/*.standalone.js', 'kube.js'],
  },
  eslintPluginPrettierRecommended,
];
