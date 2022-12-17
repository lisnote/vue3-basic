<script lang="ts" setup>
import Layout from '@/layout';
import { switchTheme } from './utils/theme';
import { onBeforeMount } from 'vue';
import { useStylesStore } from './store';

onBeforeMount(() => {
  const stylesStore = useStylesStore();
  switchTheme(stylesStore.theme);
});
</script>
<template>
  <Layout />
</template>
