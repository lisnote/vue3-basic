<script setup lang="ts">
import RecursiveMenu, { MenuRouteAdaptor } from './RecursiveMenu';
import Navigator from './Navigator';
import { menuRoutes } from '@/router';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useStylesStore } from '@/store';

const stylesStore = useStylesStore();
const router = useRouter();
const activeIndex = ref('');
router.isReady().then(() => {
  activeIndex.value = router.currentRoute.value.path;
});
</script>

<template>
  <div class="layout">
    <Navigator class="nav"></Navigator>
    <div class="main">
      <RecursiveMenu
        :data="MenuRouteAdaptor(menuRoutes)"
        :default-active="activeIndex"
        class="sidebar"
        ellipsis
      />
      <div
        class="sidebar-modal"
        :class="{
          'pointer-events-none': !stylesStore.sidebarVisible,
          'opacity-0': !stylesStore.sidebarVisible,
        }"
        @click="stylesStore.hideSidebar"
      ></div>
      <article class="article">
        <RouterView v-slot="{ Component }">
          <Transition name="fade-left">
            <component :is="Component" class="w-full" />
          </Transition>
        </RouterView>
      </article>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use '@/styles/animate.scss';

.layout {
  display: flex;
  flex-direction: column;
  height: 100%;

  .nav {
    flex-shrink: 0;
    width: 100%;
    height: 60px;
    background-color: var(--el-bg-color-overlay);
    border-bottom: solid 1px var(--el-border-color);
  }

  .main {
    flex: 1;
    display: flex;
    overflow: hidden;
    position: relative;

    .sidebar {
      height: 100%;
      background-color: var(--el-bg-color-overlay);
    }

    .sidebar-modal {
      position: fixed;
      height: 100%;
      width: 100%;
      background-color: var(--el-overlay-color-lighter);
      z-index: 1005;
      transition: opacity var(--el-transition-duration) ease;
    }

    .article {
      flex: 1;
      position: relative;
      overflow-y: auto;
      overflow-x: hidden;
      overflow-wrap: break-word;
      background-color: var(--el-bg-color-page);
    }
  }
}
</style>
