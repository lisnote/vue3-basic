import { h } from 'vue';
import { ElInput as Input } from 'element-plus';
import type { App, FunctionalComponent } from 'vue';
import 'element-plus/dist/index.css';

// 封装 ElInput 组件
// 增加最大长度限制, 以及输入完成后去除尾部空白字符
const ElInput: FunctionalComponent = function (props: typeof Input.props, ctx) {
  return h(
    Input,
    {
      ...props,
      maxlength: props.maxlength
        ? props.maxlength
        : props.type == 'textarea'
        ? 250
        : props.type === 'text' || props.type === undefined
        ? 30
        : undefined,
      onBlur() {
        ctx.emit('update:modelValue', props.modelValue.replace(/\s*$/, ''));
      },
    },
    ctx.slots,
  );
};

const components = { ElInput };

export default function (app: App) {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
  });
}
