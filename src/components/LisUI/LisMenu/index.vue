<script lang="ts" setup>
import { ElMenu } from 'element-plus';
import MenuItem from './MenuItem.vue';
import type { LisMenuData } from '.';
const props = defineProps<{
  data: LisMenuData[];
}>();
console.log(props.data);
</script>
<template>
  <el-menu mode="horizontal">
    <MenuItem v-for="(item, index) in data" :key="index" :data="item" />
  </el-menu>
</template>
