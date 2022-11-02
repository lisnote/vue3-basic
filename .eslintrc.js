module.exports = {
  env: { browser: true, node: true },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'prettier',
  ],
  parserOptions: { ecmaVersion: 2021 },
  plugins: [],
  root: true,
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
  },
};
