<script setup lang="ts">
import commonStyle from '@/styles/common.module.scss';
import '@wangeditor/editor/dist/css/style.css';
import {
  createEditor,
  createToolbar,
  type IDomEditor,
} from '@wangeditor/editor';
import { ref, onMounted } from 'vue';

const toolbarRef = ref<HTMLDivElement>();
const editorRef = ref<HTMLDivElement>();
onMounted(() => {
  if (!toolbarRef.value || !editorRef.value) return;
  const editorConfig = {
    placeholder: 'Type here...',
    onChange(editor: IDomEditor) {
      const html = editor.getHtml();
      console.log('editor content', html);
    },
  };
  const editor = createEditor({
    selector: editorRef.value,
    html: '',
    config: editorConfig,
    mode: 'default', // or 'simple'
  });
  const toolbarConfig = {};
  const _toolbar = createToolbar({
    editor,
    selector: toolbarRef.value,
    config: toolbarConfig,
    mode: 'default', // or 'simple'
  });
});
</script>

<template>
  <div :class="commonStyle.contentArea" class="flex flex-col divide-y-2">
    <div ref="toolbarRef"></div>
    <div ref="editorRef" class="flex-1"></div>
  </div>
</template>
