<script setup lang="ts">
import commonStyle from '@/styles/common.module.scss';
import markdownText from '@/assets/markdown/MarkdownTest.md?raw';
import { marked } from 'marked';
import { ref, computed } from 'vue';
import { ElInput } from 'element-plus';
const sourceText = ref(markdownText);
const markedProduct = computed(() => {
  return marked.parse(sourceText.value, { mangle: false });
});
</script>

<template>
  <div
    component="markdownRender"
    class="flex flex-wrap"
    :class="commonStyle.contentArea"
  >
    <div class="marked-source">
      <ElInput v-model="sourceText" type="textarea" class="el-textarea" />
    </div>
    <div class="marked-product" v-html="markedProduct"></div>
  </div>
</template>

<style lang="scss">
[component='markdownRender'] {
  @import 'highlight.js/styles/atom-one-light';

  .marked-source {
    flex: 1 1 50%;
    min-width: 300px;
    min-height: 50%;

    .el-textarea {
      height: 100%;

      .el-textarea__inner {
        height: 100%;
        max-height: 100%;
      }
    }
  }

  .marked-product {
    flex: 1 1 50%;
    min-width: 300px;
    overflow-y: auto;
    padding: 10px;

    pre {
      color: #383a42;
      background-color: #fafafa;
      overflow-x: auto;
      padding: 1em;
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
}

html[data-theme='dark'] [component='markdownRender'] {
  @import 'highlight.js/styles/atom-one-dark';

  .marked-product {
    pre {
      color: #abb2bf;
      background-color: #282c34;
    }
  }
}
</style>
