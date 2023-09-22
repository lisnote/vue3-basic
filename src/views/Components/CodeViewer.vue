<script setup lang="ts">
import CodeViewer from '@/components/CodeViewer.vue';
import CodeViewerStr from '@/components/CodeViewer.vue?raw';
import commonStyle from '@/styles/common.module.scss';
</script>

<template>
  <div :class="commonStyle.contentArea">
    <CodeViewer :code="CodeViewerStr" title="JAVASCRIPT" />
  </div>
</template>
