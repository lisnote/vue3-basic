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
        class="fixed h-full w-full opacity-50 z-1005 hidden bg-$el-overlay-color-lighter"
        :class="{ '<md:block': stylesStore.sidebarVisible }"
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
