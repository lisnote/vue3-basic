<script setup lang="ts">
import commonStyle from '@/styles/common.module.scss';
import {
  createEditor,
  createToolbar,
  type IDomEditor,
} from '@wangeditor/editor';
import { blobToBlobURL } from '@/utils/typeTransform';
import { ref, onMounted } from 'vue';

const toolbarRef = ref<HTMLDivElement>();
const editorRef = ref<HTMLDivElement>();
onMounted(() => {
  if (!toolbarRef.value || !editorRef.value) return;
  const editor = createEditor({
    selector: editorRef.value,
    html: '',
    config: {
      onChange(editor: IDomEditor) {
        const html = editor.getHtml();
        console.log('editor content', html);
      },
      MENU_CONF: {
        uploadImage: {
          async customUpload(
            file: File,
            insertFn: (url: string, alt: string, href: string) => void,
          ) {
            const url = blobToBlobURL(file);
            insertFn(url, file.name, url);
          },
        },
        uploadVideo: {
          async customUpload(
            file: File,
            insertFn: (url: string, poster?: string) => void,
          ) {
            const url = blobToBlobURL(file);
            insertFn(url);
          },
        },
      },
    },
    mode: 'default',
  });
  const toolbarConfig = {};
  const _toolbar = createToolbar({
    editor,
    selector: toolbarRef.value,
    config: toolbarConfig,
    mode: 'default',
  });
});
</script>

<template>
  <div
    component="RichTextEditor"
    :class="commonStyle.contentArea"
    class="flex flex-col divide-y-2"
  >
    <div ref="toolbarRef"></div>
    <ElScrollbar view-class="h-full">
      <div ref="editorRef" class="h-full"></div>
    </ElScrollbar>
  </div>
</template>

<style lang="scss">
[component='RichTextEditor'] {
  @import '@wangeditor/editor/dist/css/style';
}
</style>
