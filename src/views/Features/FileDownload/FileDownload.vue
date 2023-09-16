<script setup lang="ts">
import commonStyle from '@/styles/common.module.scss';
import { ref, onMounted } from 'vue';
import {
  urlToCanvas,
  canvasToBlobUrl,
  canvasToDataUrl,
  dataUrlToBlobUrl,
} from '@/utils/typeTransform';
import { ElButton, ElMessage } from 'element-plus';
import http, { download } from '@/utils/http';

const canvasContainerRef = ref<HTMLDivElement>();
const canvasRef = ref<HTMLCanvasElement>();
onMounted(async () => {
  const canvasContainer = canvasContainerRef.value;
  if (!canvasContainer) return;
  canvasRef.value = await urlToCanvas('/favicon.ico');
  canvasContainer.appendChild(canvasRef.value);
});
function downloadLink() {
  http({
    baseURL: '',
    url: '/favicon.ico',
    transformResponse: download(),
  });
}
function downloadDataUrl() {
  if (!canvasRef.value) {
    ElMessage.error('canvas获取失败');
    return;
  }
  http({
    url: dataUrlToBlobUrl(canvasToDataUrl(canvasRef.value)),
    transformResponse: download('dataUrl'),
  });
}
function downloadCanvas() {
  if (!canvasRef.value) {
    ElMessage.error('canvas获取失败');
    return;
  }
  http({
    url: canvasToBlobUrl(canvasRef.value),
    transformResponse: download('canvas'),
  });
}
</script>

<template>
  <div :class="commonStyle.contentArea">
    <div class="flex flex-wrap gap-10px">
      <ElButton class="!ml-0" @click="downloadLink">下载链接</ElButton>
      <ElButton class="!ml-0" @click="downloadDataUrl">下载DataUrl</ElButton>
      <ElButton class="!ml-0" @click="downloadCanvas">下载canvas图片</ElButton>
    </div>
    <div ref="canvasContainerRef"></div>
  </div>
</template>
