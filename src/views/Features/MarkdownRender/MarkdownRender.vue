<script setup lang="ts">
import commonStyle from '@/styles/common.module.scss';
import markdownText from '@/assets/markdown/MarkdownTest.md?raw';
import { marked } from 'marked';
import { ref, computed } from 'vue';
import { ElInput } from 'element-plus';
const sourceText = ref(markdownText);
const markedProduct = computed(() => {
  return marked.parse(markdownText, { mangle: false });
});
</script>

<template>
  <div component="markdownRender" class="flex" :class="commonStyle.contentArea">
    <div class="flex-1 min-w-0">
      <ElInput v-model="sourceText" type="textarea" class="el-textarea" />
    </div>
    <div
      class="flex-1 min-w-0 marked-product overflow-y-auto p-3"
      v-html="markedProduct"
    ></div>
  </div>
</template>

<style lang="scss">
[component='markdownRender'] {
  @import 'highlight.js/scss/default';
}
</style>

<style scoped lang="scss">
:deep(.el-textarea) {
  height: 100%;

  .el-textarea__inner {
    height: 100%;
    max-height: 100%;
  }
}

:deep(.marked-product) {
  pre {
    overflow-x: auto;
    background: var(--el-bg-color-page);
    padding: 1em;
    color: #444;
  }

  p,
  li {
    word-wrap: break-word;
    word-break: break-word;
  }

  blockquote {
    border-left: 5px solid var(--el-border-color);
    padding-left: 5px;
  }

  table {
    word-break: break-word;
    overflow: auto;
    background: var(--el-border-color);
    margin: 10px;

    * {
      background: var(--el-bg-color-overlay);
    }
  }

  img {
    max-width: 100%;
  }
}
</style>
