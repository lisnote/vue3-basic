<script lang="ts" setup>
import { ElMenu } from 'element-plus';
import MenuItem from './MenuItem.vue';

import type { LisMenuData } from '.';

defineProps<{
  data: LisMenuData[];
}>();
</script>
<template>
  <ElMenu>
    <MenuItem v-for="(item, index) in data" :key="index" :data="item" />
  </ElMenu>
</template>
