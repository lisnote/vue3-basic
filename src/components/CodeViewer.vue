<script lang="ts" setup>
import hljs from 'highlight.js';
import { computed, ref } from 'vue';
import { copyText } from '@/utils/clipboard';
const props = defineProps<{ code: string; title?: string }>();
const lines = computed(() => props.code.split(/\r\n|\r|\n/));
const html = computed(() => hljs.highlightAuto(props.code).value);

// control
const codeViewerRef = ref<HTMLElement>();
function fullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    codeViewerRef.value?.requestFullscreen();
  }
}
</script>

<template>
  <div ref="codeViewerRef" component="codeViewer">
    <div class="code-viewer hljs" @dblclick="fullscreen">
      <div class="header">
        <span class="title">{{ title }}</span>
        <span class="pointer" @click="copyText(code)">copy</span>
        <span class="pointer" @click="fullscreen">full</span>
      </div>
      <div class="lines-and-codes">
        <div class="lines">
          <div v-for="(_v, index) in lines" :key="index" class="hljs line">
            {{ index }}
          </div>
        </div>
        <pre class="codes" v-html="html"></pre>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
[component='codeViewer'] {
  @import 'highlight.js/styles/atom-one-light';

  height: 100%;
  width: 100%;
}

html[data-theme='dark'] [component='codeViewer'] {
  @import 'highlight.js/styles/atom-one-dark';
}
</style>

<style lang="scss" scoped>
.code-viewer {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .header {
    backdrop-filter: invert(20%);
    display: flex;
    gap: 10px;
    padding: 3px 10px;

    .title {
      flex: 1 auto;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .pointer {
      cursor: pointer;
    }
  }

  .lines-and-codes {
    flex: 1 auto;
    min-height: 0;
    display: flex;
    line-height: 24px;
    overflow: auto;
    height: 100%;

    .lines {
      user-select: none;
      text-align: right;
      position: sticky;
      left: 0;

      .line {
        padding: 0 4px;
      }
    }

    .codes {
      margin: 0;
    }
  }
}
</style>
