<script lang="ts" setup>
import commonStyle from '@/styles/common.module.scss';
import { useWatermark } from '@/hooks/useWatermark';
import { ref, onMounted } from 'vue';
const mainRef = ref();
const { setWatermark, clear } = useWatermark(mainRef);
function addWatermark() {
  setWatermark(import.meta.env.APP_NAME);
}
onMounted(addWatermark);
</script>
<template>
  <div ref="mainRef" :class="commonStyle.contentArea">
    <button @click="addWatermark">添加</button>
    <button @click="clear">移除</button>
  </div>
</template>
