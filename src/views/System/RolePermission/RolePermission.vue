<script setup lang="ts">
import commonStyle from '@/styles/common.module.scss';
import RoleTree from './RoleTree.vue';
import PermissionTree from './PermissionTree.vue';
import { ref } from 'vue';
import { type Role } from '@/apis/user';

const currentRole = ref<Role>();
</script>

<template>
  <div :class="commonStyle.contentArea" class="role-permission">
    <div class="role-tree-container">
      <RoleTree @node-click="currentRole = $event" />
    </div>
    <div class="flex-1 overflow-hidden">
      <PermissionTree :role="currentRole" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.role-permission {
  display: flex;

  .role-tree-container {
    width: 200px;
    flex: 0 0 200px;
    border-right: 1px solid var(--el-border-color);
    padding-right: 20px;
    margin-right: 20px;
  }
}
</style>
