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
    <div class="collapse-button" @click="isCollapse = !isCollapse">
      <Transition name="flip" mode="out-in">
        <Icon
          :key="isCollapse.toString()"
          :icon="isCollapse ? 'ep:fold' : 'ep:expand'"
          width="20"
          class="mx-1"
        />
      </Transition>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "@/styles/animate.scss";

.recursive-menu {
  border-right: solid 1px var(--el-border-color);

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
    background-color: var(--el-bg-color-page);
    border: 1px solid var(--el-border-color);
    border-radius: 5px;
  }
}
</style>
