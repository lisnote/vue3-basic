<script setup lang="ts">
import { getRolePermission } from '@/api/user';
import type { Role, Permission } from '@/api/user';
import { ElButton, ElTable, ElTableColumn } from 'element-plus';
import { watch, ref } from 'vue';

const props = defineProps<{
  role: Role | undefined;
}>();

const rolePermission = ref<Permission[]>();
watch(
  () => props.role,
  async () => {
    if (!props.role?.id) return;
    getRolePermission({ id: props.role.id }).then(({ data }) => {
      rolePermission.value = data.data;
    });
  },
);
</script>

<template>
  <div class="h-full flex flex-col gap-1">
    <div>
      <ElButton type="primary">保存</ElButton>
    </div>
    <ElTable :data="rolePermission" row-key="code" default-expand-all flexible>
      <ElTableColumn type="selection" width="50" />
      <ElTableColumn prop="name" label="名称" width="auto" />
      <ElTableColumn prop="code" label="权限码" width="auto" />
    </ElTable>
  </div>
</template>
