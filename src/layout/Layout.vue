<script setup lang="ts">
import LisMenu, { MenuRouteAdaptor } from './LisMenu';
import { menuRoutes } from '@/router';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const activeIndex = ref('');
router.isReady().then(() => {
  activeIndex.value = router.currentRoute.value.path;
});
</script>

<template>
  <LisMenu :data="MenuRouteAdaptor(menuRoutes)" :default-active="activeIndex" />
  <RouterView />
</template>
