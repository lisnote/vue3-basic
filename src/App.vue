<script lang="ts" setup>
import { switchTheme } from './utils/theme';
import { onBeforeMount } from 'vue';
import { useStylesStore } from './store';

onBeforeMount(() => {
  const stylesStore = useStylesStore();
  switchTheme(stylesStore.theme);
});
</script>
<template>
  <RouterView />
</template>
<style lang="scss" scoped>
:global(*) {
  margin: 0;
}
</style>
