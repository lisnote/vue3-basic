<script setup lang="ts">
import RecursiveMenu, { MenuRouteAdaptor } from './RecursiveMenu';
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
  <RecursiveMenu
    :data="MenuRouteAdaptor(menuRoutes)"
    :default-active="activeIndex"
  />
  <RouterView />
</template>
