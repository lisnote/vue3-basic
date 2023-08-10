module.exports = {
  customSyntax: 'postcss-html',
  extends: [
    'stylelint-config-prettier',
    'stylelint-config-standard-scss',
    'stylelint-config-standard-vue',
  ],
  rules: {
    'at-rule-no-unknown': null,
    'selector-class-pattern': null,
  },
};
