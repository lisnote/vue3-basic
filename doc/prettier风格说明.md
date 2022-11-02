# Prettier 风格说明

## arrowParens:"always",

箭头函数始终包含单引号

```javascript
// let fn = name=>`hello~${name}`
let fn = (name) => `hello${name}`;
```

## bracketSpacing:true,

在对象前后添加空格-eg: { foo: bar }

```javascript
// let temp = {foo:bar}
let temp = { foo: bar };
```

## embeddedLanguageFormatting:"auto",

对引用代码进行格式化
对 markdown 代码块, 模板字符串等进行格式化

```javascript
// 需要webpack/Apollo/graphql-tag之类的环境提供语法支持的方式
// let temp = graphql`type Query {name: String address: String}`;
let temp = graphql`
  type Query {
    name: String
    address: String
  }
`;
// 不需要提供语法支持的方式
// let temp = /* GraphQL */`type Query {name: String address: String}`;
let temp = /* GraphQL */ `
  type Query {
    name: String
    address: String
  }
`;
```

## endOfLine:"lf",

使用\n 作为换行符

## htmlWhitespaceSensitivity:"css",

对 HTML 全局空白敏感

```html
<!-- <span> temp </span> -->
<!-- <div> temp </div> -->
<span> temp </span>
<div>temp</div>
```

## printWidth:80,

单行长度超过 80 时进行折叠

## proseWrap:"preserve",

markdown 中不进行自动换行

## quoteProps:"as-needed",

仅在必需时为对象的 key 添加引号

```javascript
// temp = {
//   'key': 'temp',
//   'key-asdf': 'asdfas',
// };
temp = {
  key: 'temp',
  'key-asdf': 'asdfas',
};
```

## semi:true,

句末使用分号

```javascript
// let temp
let temp;
```

## singleQuote:true,

使用单引号

```javascript
// let temp = "temp";
let temp = 'temp';
```

## tabWidth:2,

缩进长度为 2

```javascript
// let temp = {
//     temp: 'temp',
// };
let temp = {
  temp: 'temp',
};
```

## trailingComma:"all",

多行时尽可能打印尾随逗号

```javascript
// let arr = [
//   temptemptemptemp,
//   temptemptemptemp,
//   temptemptemptemp,
//   temptemptemptemp
// ];
let arr = [
  temptemptemptemp,
  temptemptemptemp,
  temptemptemptemp,
  temptemptemptemp,
];
```

## useTabs:false,

使用空格代替 tab 缩进

```javascript
// if (true) {
// 	return 0;
// }
if (true) {
  return 0;
}
```

## vueIndentScriptAndStyle:false,

不对 vue 中的 script 及 style 标签缩进

```vue
<!--
<script>
  let temp;
</script> 
-->
<script>
let temp;
</script>
```
