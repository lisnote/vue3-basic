<script lang="ts" setup>
import { ElSubMenu, ElMenuItem, ElTooltip } from 'element-plus';
import { Icon } from '@iconify/vue';
import { useStyleStore } from '@/store';
import type { RecursiveMenuData } from '.';
import { hasPermission } from '@/hooks/usePermission';
import { t } from '@/locales';
import { ref } from 'vue';

defineProps<{ data: RecursiveMenuData }>();
const styleStore = useStyleStore();

// SubMenu/MenuItem 判断
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

// 菜单文字溢出时显示 Tooltip
const menuTextRef = ref<HTMLElement>();
const tooltipDisabled = ref(false);
function hoverMenu() {
  const menuTextContainer = menuTextRef.value!;
  tooltipDisabled.value = !(
    menuTextContainer.scrollWidth > menuTextContainer.clientWidth
  );
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
      <ElTooltip
        :content="t(data.title)"
        placement="right"
        :offset="36"
        :disabled="tooltipDisabled"
      >
        <span ref="menuTextRef" class="ellipsis" @mouseover="hoverMenu">
          {{ t(data.title) }}
        </span>
      </ElTooltip>
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
    <ElTooltip
      :content="t(data.title)"
      placement="right"
      :disabled="tooltipDisabled"
    >
      <span ref="menuTextRef" class="ellipsis" @mouseover="hoverMenu">
        {{ t(data.title) }}
      </span>
    </ElTooltip>
  </ElMenuItem>
</template>
<style module lang="scss">
.subMenu {
  max-height: calc(100vh - 10px);
  overflow-y: auto;
}
</style>
