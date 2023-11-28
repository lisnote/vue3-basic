<script lang="ts" setup>
import { ElSubMenu, ElMenuItem } from 'element-plus';
import { Icon } from '@iconify/vue';
import { useStyleStore } from '@/store';
import type { RecursiveMenuData } from '.';
import { hasPermission } from '@/hooks/usePermission';
import { t } from '@/locales';

defineProps<{ data: RecursiveMenuData }>();
const styleStore = useStyleStore();

function isMenu(data: RecursiveMenuData) {
  if (!data.children?.length) return false;
  for (const child of data.children) {
    if (!child.permission || hasPermission(child.permission)) return true;
  }
}
function isMenuItem(data: RecursiveMenuData) {
  if (data.children?.length) return false;
  return !data.permission || hasPermission(data.permission);
}
</script>
<template>
  <ElSubMenu
    v-if="isMenu(data)"
    :index="data.index"
    teleported
    :popper-class="$style.subMenu"
    @click="data.onClick"
  >
    <template #title>
      <div v-if="data.icon" class="flex">
        <Icon :icon="data.icon" width="20" class="mx-1" />
      </div>
      <span>{{ t(data.title) ?? data.title }}</span>
    </template>
    <MenuItem
      v-for="(item, index) in data.children"
      :key="index"
      :data="item"
    />
  </ElSubMenu>
  <ElMenuItem
    v-else-if="isMenuItem(data)"
    :index="data.index"
    @click="data.onClick?.(), styleStore.hideSidebar()"
  >
    <div v-if="data.icon" class="flex">
      <Icon :icon="data.icon" width="20" class="mx-1" />
    </div>
    <span>{{ t(data.title) ?? data.title }}</span>
  </ElMenuItem>
</template>
<style module lang="scss">
.subMenu {
  max-height: calc(100vh - 10px);
  overflow-y: auto;
}
</style>
