<script setup lang="ts">
import CodeViewer from '@/components/CodeViewer';
import CodeViewerStr from '@/components/CodeViewer/CodeViewer.vue?raw';
import common from '@/styles/common.module.scss';
</script>

<template>
  <div :class="common.contentArea">
    <CodeViewer :code="CodeViewerStr" title="JAVASCRIPT" />
  </div>
</template>
