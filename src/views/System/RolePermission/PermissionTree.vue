<script setup lang="ts">
import { getRolePermission } from '@/api/user';
import type { Role, Permission } from '@/api/user';
import { treeForEach } from '@/utils/dataStructure';
import { ElTable, ElTableColumn } from 'element-plus';
import { watch, ref, nextTick } from 'vue';

const props = defineProps<{
  role: Role | undefined;
}>();

const rolePermission = ref<Permission[]>();
const tableRef = ref<InstanceType<typeof ElTable>>();

watch(
  () => props.role,
  async () => {
    const tabelInstance = tableRef.value!;
    if (!props.role?.id) return;
    getRolePermission({ id: props.role.id }).then(({ data }) => {
      rolePermission.value = data.data;
      treeForEach(data.data, (node) => {
        nextTick(() => tabelInstance.toggleRowSelection(node, node.has));
      });
    });
  },
);
</script>

<template>
  <div class="h-full flex flex-col gap-1">
    <ElTable
      ref="tableRef"
      :data="rolePermission"
      row-key="code"
      default-expand-all
      flexible
    >
      <ElTableColumn type="selection" width="50" />
      <ElTableColumn prop="name" label="名称" width="auto" />
      <ElTableColumn prop="code" label="权限码" width="auto" />
    </ElTable>
  </div>
</template>
