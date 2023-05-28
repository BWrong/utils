// https://prettier.io/docs/en/options.html
module.exports = {
  printWidth: 500, //每一行代码最大长度
  tabWidth: 2, //指定每个缩进级别的空格数。
  useTabs: false, //用制表符而不是空格缩进行。
  semi: true, // 在语句末尾打印分号。
  singleQuote: true, // 使用单引号代替双引号。
  quoteProps: 'as-needed', //引用对象中的属性时更改。"as-needed" - 仅在需要时在对象属性周围添加引号。"consistent" - 如果对象中至少有一个属性需要引用，请引用所有属性。"preserve" - 尊重对象属性中引号的输入使用。
  bracketSpacing: true, //在对象文字中的括号之间打印空格。
  trailingComma: 'es5', // 在多行逗号分隔的句法结构中尽可能打印尾随逗号。"es5"- 在 ES5 中有效的尾随逗号（对象、数组等）。TypeScript 中的类型参数中没有尾随逗号。"none" - 没有尾随逗号。"all"- 尽可能尾随逗号
  jsxBracketSameLine: false, //将>多行 JSX 元素的 放在最后一行的末尾，而不是单独放在下一行（不适用于自关闭元素）。
  jsxSingleQuote: false, //在 JSX 中使用单引号代替双引号。
  arrowParens: 'avoid', //在唯一的箭头函数参数周围包含括号,"always"- 始终包括括号。例子：(x) => x ,"avoid"- 尽可能省略括号。例子：x => x
  insertPragma: false,
  requirePragma: false,
  proseWrap: 'never',
  htmlWhitespaceSensitivity: 'strict', //为 HTML、Vue、Angular 和 Handlebars 指定全局空白敏感度。"css"- 尊重 CSSdisplay属性的默认值。对于 Handlebars 与strict.   "strict" - 所有标签周围的空白（或没有空白）被认为是重要的。"ignore" - 所有标签周围的空白（或没有空白）被认为是无关紧要的。
  vueIndentScriptAndStyle: true, //是否缩进Vue 文件中的代码<script>和<style>标签。"false" - 不要在 Vue 文件中缩进脚本和样式标签。  "true" - 在 Vue 文件中缩进脚本和样式标签。
  endOfLine: 'lf', //行结束
  plugins:['prettier-plugin-packagejson']
};
