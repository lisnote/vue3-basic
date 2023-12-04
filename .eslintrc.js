const OFF = 'off';
const WARN = 'warn';
const ERROR = 'error';
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
    '@typescript-eslint/no-explicit-any': OFF, // 允许 any 类型
    '@typescript-eslint/no-inferrable-types': OFF, // 能够被类型推断的变量也允许进行类型声明
    '@typescript-eslint/no-unused-vars': [
      WARN,
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ], // 定义但是未使用的变量名必须以下划线'_'为开头
    'spaced-comment': [ERROR, 'always', { markers: ['/'] }], // 除 /// 类型的注释外, 所有注释开头必须带有空格
    camelcase: [ERROR, { properties: 'always' }], // 强制驼峰命名
    'vue/multi-word-component-names': OFF, // 路由组件允许非复合单词
    'vue/no-v-html': OFF, // 允许 v-html 指令
  },
  overrides: [
    {
      files: ['*.html'],
      rules: {
        'vue/comment-directive': OFF,
      },
    },
  ],
};
