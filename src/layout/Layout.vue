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
  <div class="layout">
    <RecursiveMenu
      :data="MenuRouteAdaptor(menuRoutes)"
      :default-active="activeIndex"
      class="sidebar"
      ellipsis
    />
    <div class="main">
      <nav class="nav">nav</nav>
      <article class="article">
        <RouterView />
      </article>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.layout {
  display: flex;
  height: 100%;

  .sidebar {
    flex-shrink: 0;
    width: 200px;
    height: 100%;
  }

  .main {
    flex: 1;
    display: flex;
    flex-direction: column;

    .nav {
      flex-shrink: 0;
      width: 100%;
      height: 50px;
      border-bottom: solid 1px var(--el-menu-border-color);
    }

    .article {
      flex: 1;
      position: relative;
      overflow-y: auto;
    }
  }
}
</style>
