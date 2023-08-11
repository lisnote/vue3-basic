<script lang="ts" setup>
import { ElMenu } from 'element-plus';
import MenuItem from './MenuItem.vue';
import { ref, computed } from 'vue';
import router from '@/router';
import { Icon } from '@iconify/vue';

import type { RecursiveMenuData } from '.';

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
  <div class="recursive-menu flex flex-col">
    <ElScrollbar class="flex-1">
      <div>
        <ElMenu
          :collapse="isCollapse"
          :default-active="defaultAvtive"
          unique-opened
          class="menu"
        >
          <MenuItem v-for="(item, index) in data" :key="index" :data="item" />
        </ElMenu>
      </div>
    </ElScrollbar>
    <div @click="isCollapse = !isCollapse">
      <Icon icon="ep:fold" width="20" class="mx-1" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.menu {
  &:not(.el-menu--collapse) {
    width: 200px;
  }
}
</style>
