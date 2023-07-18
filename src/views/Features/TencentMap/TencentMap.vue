<script lang="ts" setup>
import { TMap } from './index';
import { ref, onMounted } from 'vue';

const mapRef = ref<HTMLDivElement>();
onMounted(() => {
  // 设置地图
  const map = new TMap.Map(mapRef.value, {
    center: new TMap.LatLng(32.847884, 110.154354),
    zoom: 5,
  });
  // 限制边界
  const sw = new TMap.LatLng(-84.9, -179.9999);
  const ne = new TMap.LatLng(84.9, 180);
  const boundary = new TMap.LatLngBounds(sw, ne);
  map.setBoundary(boundary);
  // 监听地图点击事件
  map.on('click', console.log);
  // 地图标记
  const markerLayer = new TMap.MultiMarker({
    map: map,
    styles: {
      mapMark: new TMap.MarkerStyle({
        width: 35,
        height: 35,
        src: 'https://avatars.githubusercontent.com/lisnote',
      }),
    },
    geometries: [
      {
        id: 'avatar',
        styleId: 'mapMark',
        position: new TMap.LatLng(22.6106319, 114.0302668),
      },
      {
        id: 'target',
        position: new TMap.LatLng(39.994104, 116.287503),
      },
    ],
  });
  // 监听地图标记事件
  markerLayer.on('click', console.log);
  // 信息窗口
  const _infoWindow = new TMap.InfoWindow({
    map: map,
    position: new TMap.LatLng(21.2772538057459, 110.35657555734383),
    content: `<div>湛江市</div>`,
  });
});
</script>
<template>
  <div ref="mapRef" class="w-full h-full overflow-hidden"></div>
</template>
