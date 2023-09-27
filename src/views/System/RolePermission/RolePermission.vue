<script setup lang="ts">
import commonStyle from '@/styles/common.module.scss';
import RoleTree from './RoleTree.vue';
import PermissionTree from './PermissionTree.vue';
function log(...args: any[]) {
  console.log(...args);
}
</script>

<template>
  <div :class="commonStyle.contentArea" class="role-permission">
    <div class="role-tree-container">
      <RoleTree @node-click="log" />
    </div>
    <div class="flex-1">
      <PermissionTree />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.role-permission {
  display: flex;

  .role-tree-container {
    // w-200px flex-shrink-0 border-r border-$el-border-color mr-10px
    width: 200px;
    flex: 0 0 200px;
    border-right: 1px solid var(--el-border-color);
    padding-right: 20px;
    margin-right: 20px;
  }
}
</style>
