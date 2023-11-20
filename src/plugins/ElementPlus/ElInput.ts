import { h, FunctionalComponent } from 'vue';
import { ElInput as Input } from 'element-plus';

/**
 * 封装 ElInput 组件,
 * 增加功能 :
 * - 默认的最大长度限制
 * - 失去焦点后自动去除尾部空白字符
 */
export const ElInput: FunctionalComponent = function (
  props: typeof Input.props,
  ctx,
) {
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
      onChange() {
        ctx.emit('update:modelValue', props.modelValue.replace(/\s*$/, ''));
      },
    },
    ctx.slots,
  );
};
