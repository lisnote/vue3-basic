<script setup lang="ts">
import commonStyle from '@/styles/common.module.scss';
import { ref, onMounted } from 'vue';
import * as pdfjs from 'pdfjs-dist';
import PdfjsWorker from 'pdfjs-dist/build/pdf.worker.js?url';
import pdfUrl from '@/assets/pdf/HelloWorld.pdf?url';
import Pagination from '@/components/Pagination';

const containerRef = ref<HTMLDivElement>();
let pdfDoc: pdfjs.PDFDocumentProxy;
onMounted(() => {
  // PDF 渲染参数
  pdfjs.GlobalWorkerOptions.workerSrc = PdfjsWorker;
  // 异步加载 PDF 文件
  pdfjs.getDocument(pdfUrl).promise.then(function (doc) {
    pdfDoc = doc;
    paging.value.total = pdfDoc.numPages;
    updateRender();
  });
});

const paging = ref({
  page: 1,
  limit: 1,
  total: 1,
});
function updateRender() {
  const container = containerRef.value;
  if (!container) return;
  pdfDoc.getPage(paging.value.page).then(function (page) {
    let viewport = page.getViewport({ scale: 1 });
    const heightRate = container.clientHeight / viewport.height;
    const widthRate = container.clientWidth / viewport.width;
    viewport = viewport.clone({
      scale: heightRate < widthRate ? heightRate : widthRate,
    });
    // 创建 Canvas 元素
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    container.innerHTML = '';
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
</script>

<template>
  <div :class="commonStyle.contentArea">
    <div class="flex flex-col h-full">
      <div ref="containerRef" class="flex-1 overflow-hidden"></div>
      <Pagination
        v-model:page="paging.page"
        v-model:limit="paging.limit"
        :total="paging.total"
        layout="total, prev, pager, next, jumper"
        class="flex justify-end"
        @change="updateRender"
      />
    </div>
  </div>
</template>
