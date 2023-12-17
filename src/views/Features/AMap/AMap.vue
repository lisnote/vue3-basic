<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader';
import { onMounted } from 'vue';
import { useStyleStore } from '@/store';
import { useWatchIsDarkTheme } from '@/hooks/useTheme';

const styleStore = useStyleStore();
window._AMapSecurityConfig = {
  securityJsCode: window.config.securityJsCode,
};
onMounted(() => {
  AMapLoader.load({
    key: window.config.AMapKey,
    version: '2.0',
  }).then((AMap) => {
    // 渲染地图
    const map = new AMap.Map('amap', {
      center: new AMap.LngLat(110.154354, 32.847884),
      zoom: 5,
      mapStyle: styleStore.theme === 'dark' ? 'amap://styles/darkblue' : '',
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
    // 根据主题变化切换地图样式
    useWatchIsDarkTheme((value) => {
      if (value) {
        map.setMapStyle('amap://styles/darkblue');
      } else {
        map.setMapStyle('amap://styles/normal');
      }
    });
  });
});
</script>

<template>
  <div id="amap" class="h-full w-full"></div>
</template>
