<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader';
import { onMounted } from 'vue';
import { useStyleStore } from '@/store';

const styleStore = useStyleStore();
window._AMapSecurityConfig = {
  securityJsCode: 'ed8a8c2acd6ca27b12e08179c4efe36e',
};
onMounted(() => {
  AMapLoader.load({
    key: 'ed2bc82159b21fa8303b8f70164ad093',
    version: '2.0',
  }).then((AMap) => {
    // 渲染地图
    const map = new AMap.Map('amap', {
      center: new AMap.LngLat(110.154354, 32.847884),
      zoom: 5,
      mapStyle:
        styleStore.theme === 'dark' ? 'amap://styles/darkblue' : undefined,
    });
    // 监听地图事件
    map.on('click', console.log);
    // 添加地图标记
    map.add([
      new AMap.Marker({
        position: new AMap.LngLat(110.154354, 32.847884),
        content: /* HTML */ `<div class="custom-content-marker">
            <img src="./favicon.ico" width="30" />
          </div>
          ,`,
        offset: new AMap.Pixel(-15, -15),
      }),
      new AMap.Marker({
        position: new AMap.LngLat(110.345415, 21.278388),
      }),
    ]);
  });
});
</script>

<template>
  <div id="amap" class="h-full w-full"></div>
</template>
