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

  --w-e-textarea-bg-color: #fff;
  --w-e-textarea-color: #333;
  --w-e-textarea-border-color: #ccc;
  --w-e-textarea-slight-border-color: #e8e8e8;
  --w-e-textarea-slight-color: #d4d4d4;
  --w-e-textarea-slight-bg-color: #f5f2f0;
  --w-e-textarea-selected-border-color: #b4d5ff;
  --w-e-textarea-handler-bg-color: #4290f7;
  --w-e-toolbar-color: #595959;
  --w-e-toolbar-bg-color: #fff;
  --w-e-toolbar-active-color: #333;
  --w-e-toolbar-active-bg-color: #f1f1f1;
  --w-e-toolbar-disabled-color: #999;
  --w-e-toolbar-border-color: #e8e8e8;
  --w-e-modal-button-bg-color: #fafafa;
  --w-e-modal-button-border-color: #d9d9d9;

  .w-e-textarea-video-container {
    padding: 0;
    border: 0;
  }
}
</style>
