<script lang="ts" setup>
import { ElMenu, ElScrollbar } from 'element-plus';
import MenuItem from './MenuItem.vue';

import type { RecursiveMenuData } from '.';

defineProps<{
  data: RecursiveMenuData[];
}>();
</script>
<template>
  <ElScrollbar>
    <ElMenu unique-opened>
      <MenuItem v-for="(item, index) in data" :key="index" :data="item" />
    </ElMenu>
  </ElScrollbar>
</template>
