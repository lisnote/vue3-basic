<script lang="ts" setup>
import commonStyle from '@/styles/common.module.scss';
import { EditorView, basicSetup } from 'codemirror';
import {
  javascript,
  javascriptLanguage,
  scopeCompletionSource,
} from '@codemirror/lang-javascript';
import { ref, onMounted, watch } from 'vue';
import { oneDark } from '@codemirror/theme-one-dark';
import { useStylesStore } from '@/store';

const stylesStore = useStylesStore();
const codeRef = ref<HTMLDivElement>();
const editor = ref<InstanceType<typeof EditorView>>();
function init() {
  const doc =
    editor.value?.state.doc.toString() ||
    'function hello(who = "world") {\n' +
      '  console.log(`Hello, ${who}!`)\n' +
      '}';
  editor.value?.destroy();
  editor.value = new EditorView({
    doc,
    extensions: [
      basicSetup,
      javascript(),
      javascriptLanguage.data.of({
        autocomplete: scopeCompletionSource(window),
      }),
      stylesStore.theme === 'dark' ? oneDark : [],
    ],
    parent: codeRef.value,
  });
}
onMounted(init);
watch(() => stylesStore.theme === 'dark', init);
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
