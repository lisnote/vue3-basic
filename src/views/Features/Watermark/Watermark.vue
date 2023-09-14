<script lang="ts" setup>
import commonStyle from '@/styles/common.module.scss';
import { useWatermark } from '@/hooks/useWatermark';
import { useMainStore } from '@/store';
import { ref, onMounted } from 'vue';
const mainStore = useMainStore();
const mainRef = ref();
const { setWatermark, clear } = useWatermark(mainRef);
onMounted(() => {
  setWatermark(mainStore.projectName);
});
</script>
<template>
  <div ref="mainRef" :class="commonStyle.contentArea">
    <button @click="setWatermark(mainStore.projectName)">添加</button>
    <button @click="clear">移除</button>
  </div>
</template>
