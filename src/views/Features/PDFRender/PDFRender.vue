<script setup lang="ts">
import commonStyle from '@/styles/common.module.scss';
import { ref, onMounted } from 'vue';
import * as pdfjs from 'pdfjs-dist';
import PdfjsWorker from 'pdfjs-dist/build/pdf.worker.js?url';
import pdfUrl from '@/assets/pdf/HelloWorld.pdf?url';

const containerRef = ref<HTMLDivElement>();
onMounted(() => {
  // PDF 渲染参数
  pdfjs.GlobalWorkerOptions.workerSrc = PdfjsWorker;
  // 加载 PDF 文件
  pdfjs.getDocument(pdfUrl).promise.then(async (pdfDoc) => {
    for (let i = 1; i <= pdfDoc.numPages; i++) {
      await renderPage(i);
    }
    // 渲染单个页面
    async function renderPage(page: number) {
      const container = containerRef.value;
      if (!container) return;
      await pdfDoc.getPage(page).then((page) => {
        let viewport = page.getViewport({ scale: 1 });
        const heightRate = container.clientHeight / viewport.height;
        const widthRate = container.clientWidth / viewport.width;
        viewport = viewport.clone({
          scale: heightRate < widthRate ? heightRate : widthRate,
        });
        // 创建并插入 Canvas 元素
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        container.appendChild(canvas);
        // 渲染 PDF 到 Canvas
        const context = canvas.getContext('2d');
        if (!context) return;
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        page.render(renderContext);
      });
    }
  });
});
</script>

<template>
  <div :class="commonStyle.contentArea">
    <div ref="containerRef" class="pdf-container h-full"></div>
  </div>
</template>
<style lang="scss" scoped>
:deep(.pdf-container) {
  margin: 0 auto;

  canvas {
    box-shadow: 0 0 10px var(--el-border-color-darker);
  }
}
</style>
