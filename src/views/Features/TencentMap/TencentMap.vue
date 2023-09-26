<script lang="ts" setup>
import { TMap, DomMarker } from '@/utils/TMap';
import { ref, onMounted, useCssModule } from 'vue';
import { useStyleStore } from '@/store';
import { useWatchIsDarkTheme } from '@/hooks/useTheme';
import { toString } from 'lodash-es';
const styleStore = useStyleStore();
const mapRef = ref<HTMLDivElement>();
const markerList: DomMarker[] = [];
onMounted(async () => {
  // 设置地图
  const center = new TMap.LatLng(32.847884, 110.154354);
  const map = new TMap.Map(mapRef.value, {
    center,
    zoom: 5,
    mapStyleId: styleStore.theme === 'dark' ? '1' : 'DEFAULT',
  });
  // 限制边界
  const sw = new TMap.LatLng(-84.9, -179.9999);
  const ne = new TMap.LatLng(84.9, 180);
  const boundary = new TMap.LatLngBounds(sw, ne);
  map.setBoundary(boundary);
  // 创建及插入dom
  const pointClass = useCssModule('$style').point;
  function insertMarker(position: { lat: number; lng: number }) {
    const dom = document.createElement('div');
    dom.classList.add(pointClass);
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
  // 根据主题变化切换地图样式
  useWatchIsDarkTheme((value) => {
    if (value) {
      map.setMapStyleId('1');
    } else {
      map.setMapStyleId('DEFAULT');
    }
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
      <button class="m-5 bg-white text-black" @click="clearMarker">
        清空marker
      </button>
    </div>
  </div>
</template>
<style module>
.point {
  height: 20px;
  width: 20px;
  background: var(--el-color-primary);
  position: absolute;
  border-radius: 10px;
}
</style>
