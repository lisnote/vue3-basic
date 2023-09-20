<script lang="ts" setup>
import commonStyle from '@/styles/common.module.scss';
import { useWatermark } from '@/hooks/useWatermark';
import { ref, onMounted } from 'vue';
import pkg from '@root/package.json';
const mainRef = ref();
const { setWatermark, clear } = useWatermark(mainRef);
onMounted(() => {
  setWatermark(pkg.name);
});
</script>
<template>
  <div ref="mainRef" :class="commonStyle.contentArea">
    <button @click="setWatermark(pkg.name)">添加</button>
    <button @click="clear">移除</button>
  </div>
</template>
