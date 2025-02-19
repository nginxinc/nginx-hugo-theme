import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  {
    files: ['**/*.js'],
    rules: {
      'no-trailing-spaces': 'error',
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    },
  },
  {
    ignores: ['**/*.min.js', '**/*.standalone.js', 'kube.js'],
  },
  eslintPluginPrettierRecommended,
];
