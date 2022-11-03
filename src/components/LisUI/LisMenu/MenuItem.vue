<script lang="ts" setup>
import { ElSubMenu, ElMenuItem } from 'element-plus';

import type { LisMenuData } from '.';

defineProps<{ data: LisMenuData }>();
</script>
<template>
  <el-sub-menu v-if="data.children?.length > 0" :index="data.index">
    <template #title>{{ data.title }}</template>
    <MenuItem
      v-for="(item, index) in data.children"
      :key="index"
      :data="item"
    />
  </el-sub-menu>
  <el-menu-item v-else :index="data.index">{{ data.title }}</el-menu-item>
</template>
