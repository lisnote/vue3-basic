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

  --w-e-textarea-bg-color: var(--el-bg-color-overlay);
  --w-e-textarea-color: var(--el-text-color-primary);
  --w-e-textarea-border-color: var(--el-border-color);
  --w-e-textarea-slight-border-color: var(--el-border-color-light);
  --w-e-textarea-slight-color: var(--el-text-color-regular);
  --w-e-textarea-slight-bg-color: var(--el-bg-color-page);
  --w-e-textarea-selected-border-color: var(--el-border-color-darker);
  --w-e-textarea-handler-bg-color: var(--el-bg-color);
  --w-e-toolbar-color: var(--el-text-color-regular);
  --w-e-toolbar-bg-color: var(--el-bg-color-overlay);
  --w-e-toolbar-active-color: var(--el-text-color-primary);
  --w-e-toolbar-active-bg-color: var(--el-color-primary-light-9);
  --w-e-toolbar-disabled-color: var(--el-disabled-text-color);
  --w-e-toolbar-border-color: var(--el-border-color);
  --w-e-modal-button-bg-color: var(--el-fill-color-blank);
  --w-e-modal-button-border-color: var(--el-border-color);

  .w-e-textarea-video-container {
    padding: 0;
    border: 0;
  }
}
</style>
