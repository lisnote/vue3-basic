<script lang="ts" setup>
import { ElSubMenu, ElMenuItem } from 'element-plus';
import { Icon } from '@iconify/vue';
import { useStylesStore } from '@/store';
import type { RecursiveMenuData } from '.';

defineProps<{ data: RecursiveMenuData }>();
const stylesStore = useStylesStore();
</script>
<template>
  <ElSubMenu
    v-if="data.children?.length ?? 0 > 0"
    :index="data.index"
    teleported
    :popper-class="$style.subMenu"
    @click="data.onClick"
  >
    <template #title>
      <div v-if="data.icon" class="flex">
        <Icon :icon="data.icon" width="20" class="mx-1" />
      </div>
      <span>{{ data.title }}</span>
    </template>
    <MenuItem
      v-for="(item, index) in data.children"
      :key="index"
      :data="item"
    />
  </ElSubMenu>
  <ElMenuItem
    v-else
    :index="data.index"
    @click="data.onClick?.(), stylesStore.hideSidebar()"
  >
    <div v-if="data.icon" class="flex">
      <Icon :icon="data.icon" width="20" class="mx-1" />
    </div>
    <span>{{ data.title }}</span>
  </ElMenuItem>
</template>
<style module lang="scss">
.subMenu {
  max-height: calc(100vh - 10px);
  overflow-y: auto;
}
</style>
