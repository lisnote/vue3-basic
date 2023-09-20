<script lang="ts" setup>
import { ElMenu } from 'element-plus';
import MenuItem from './MenuItem.vue';
import { ref, computed } from 'vue';
import router from '@/router';
import { Icon } from '@iconify/vue';
import { useStylesStore } from '@/store';

import type { RecursiveMenuData } from '.';

const stylesStore = useStylesStore();
defineProps<{
  data: RecursiveMenuData[];
}>();

const isCollapse = ref(false);
// 默认路由
const defaultAvtive = computed(() => {
  return router.currentRoute.value.path;
});
</script>
<template>
  <div
    class="recursive-menu flex flex-col"
    :style="{
      position: stylesStore.deviceMode === 'mobild' ? 'absolute' : 'static',
      transform:
        !stylesStore.sidebarVisible && stylesStore.deviceMode === 'mobild'
          ? 'translateX(-100%)'
          : '',
    }"
  >
    <ElScrollbar class="flex-1">
      <div>
        <ElMenu
          :collapse="isCollapse && stylesStore.deviceMode === 'pc'"
          :default-active="defaultAvtive"
          unique-opened
          class="menu"
        >
          <MenuItem v-for="(item, index) in data" :key="index" :data="item" />
        </ElMenu>
      </div>
    </ElScrollbar>
    <div
      v-show="stylesStore.deviceMode === 'pc'"
      class="collapse-button"
      @click="isCollapse = !isCollapse"
    >
      <Transition name="flip" mode="out-in">
        <Icon
          :key="isCollapse.toString()"
          :icon="isCollapse ? 'ep:expand' : 'ep:fold'"
          width="20"
          class="mx-1"
        />
      </Transition>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use '@/styles/animate.scss';

.recursive-menu {
  border-right: solid 1px var(--el-border-color);
  z-index: 1010;
  transition: transform var(--el-transition-duration) ease;

  .menu {
    border-right: 0;

    &:not(.el-menu--collapse) {
      width: 200px;
    }
  }

  .collapse-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px auto;
    width: 90%;
    height: 30px;
    border: 1px solid var(--el-border-color);
    border-radius: 5px;

    &:hover {
      cursor: pointer;
      background: var(--el-color-primary-light-9);
    }
  }
}
</style>
