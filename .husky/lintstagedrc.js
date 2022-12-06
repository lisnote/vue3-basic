module.exports = {
  '*.{css,scss,vue}': ['stylelint --fix'],
  '*.{js,ts,vue,json,json5,css,scss,html,md}': ['prettier --write'],
  '*.{js,ts,html,vue}': ['eslint --fix'],
};
