<!-- 
  封装内容
  1. 内容变更后焦点后删除尾部空白
  2. 默认长度在类型为 text 时是 30, 为 textarea 时是 250
  3. 允许不设置 v-model
 -->
<script lang="ts" setup>
import { ElInput } from 'element-plus';
import { ref } from 'vue';
import { computed } from 'vue';

// 事件代理
const emit = defineEmits({
  'update:modelValue': (value: string | number) => value,
});
// 属性代理
const props = defineProps({
  type: {
    type: String,
    required: false,
    default: 'text',
  },
  moduleValue: {
    type: [String, Number],
    required: false,
    default: undefined,
  },
  maxlength: {
    type: [String, Number],
    required: false,
    default: ({ type = 'text' }) => {
      return type === 'textarea' ? 250 : type === 'text' ? 30 : undefined;
    },
  },
});
// 方法代理
const inputRef = ref<InstanceType<typeof ElInput>>();
defineExpose({
  blur: () => inputRef.value?.blur(),
  clear: () => inputRef.value?.clear(),
  focus: () => inputRef.value?.focus(),
  resizeTextarea: () => inputRef.value?.resizeTextarea(),
  select: () => inputRef.value?.blur(),
  input: computed(() => inputRef.value?.input),
  textarea: computed(() => inputRef.value?.textarea),
  textareaStyle: computed(() => inputRef.value?.textareaStyle),
});

// v-model 代理
const defaultValue = ref<string | number>('');
const reactValue = computed({
  get() {
    return props.moduleValue === undefined
      ? defaultValue.value
      : props.moduleValue;
  },
  set(newValue) {
    emit('update:modelValue', newValue);
    defaultValue.value = newValue;
  },
});
</script>

<template>
  <ElInput
    ref="inputRef"
    v-model="reactValue"
    :maxlength="props.maxlength"
    :type="props.type"
    :props="$attrs"
    :class="$style.noneCancelButton"
    @change="reactValue = $event.replace(/\s*$/, '')"
  >
    <template v-for="(value, key) of $slots" #[key]="attrs" :key="key">
      <component :is="value" v-if="value" :props="attrs" />
    </template>
  </ElInput>
</template>

<style lang="scss" module>
.noneCancelButton {
  input[type='search' i]::-webkit-search-cancel-button {
    display: none;
  }
}
</style>
