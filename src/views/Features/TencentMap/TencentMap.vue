<script lang="ts" setup>
import { TMap, DomMarker } from '@/utils/TMap';
import { ref, onMounted } from 'vue';

const mapRef = ref<HTMLDivElement>();
const markerList: DomMarker[] = [];
onMounted(async () => {
  // 设置地图
  const center = new TMap.LatLng(32.847884, 110.154354);
  const map = new TMap.Map(mapRef.value, {
    center,
    zoom: 5,
  });
  // 限制边界
  const sw = new TMap.LatLng(-84.9, -179.9999);
  const ne = new TMap.LatLng(84.9, 180);
  const boundary = new TMap.LatLngBounds(sw, ne);
  map.setBoundary(boundary);
  // 创建及dom
  function insertMarker(position: { lat: number; lng: number }) {
    const dom = document.createElement('div');
    dom.style.cssText =
      'height:20px;width:20px;background:red;position:absolute;';
    const dm = new DomMarker({
      map,
      position,
      dom,
    });
    markerList.push(dm);
  }
  // 监听地图点击事件
  map.on('click', ({ latLng }: { latLng: { lat: number; lng: number } }) => {
    insertMarker(latLng);
  });
});
function clearMarker() {
  markerList.forEach((marker) => {
    marker.setMap(null);
  });
}
</script>
<template>
  <div class="h-full relative">
    <div ref="mapRef" class="w-full h-full overflow-hidden"></div>
    <div class="absolute top-0 z-1000">
      <button class="m-5 bg-white" @click="clearMarker">清空marker</button>
    </div>
  </div>
</template>
