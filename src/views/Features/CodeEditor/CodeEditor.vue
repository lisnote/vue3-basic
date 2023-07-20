<script lang="ts" setup>
import commonStyle from '@/styles/common.module.scss';
import { EditorView, basicSetup } from 'codemirror';
import {
  javascript,
  javascriptLanguage,
  scopeCompletionSource,
} from '@codemirror/lang-javascript';
import { ref, onMounted } from 'vue';

const codeRef = ref<HTMLDivElement>();
onMounted(() => {
  new EditorView({
    doc:
      `function hello(who = "world") {\n` +
      `  console.log(\`Hello, \${who}!\`)\n` +
      `}`,
    extensions: [
      basicSetup,
      javascript(),
      javascriptLanguage.data.of({
        autocomplete: scopeCompletionSource(window),
      }),
    ],
    parent: codeRef.value,
  });
});
</script>

<template>
  <div :class="commonStyle.contentArea">
    <div ref="codeRef" class="code"></div>
  </div>
</template>
<style lang="scss" scoped>
:deep(.code) {
  height: 100%;

  > div {
    height: 100%;
  }
}
</style>
