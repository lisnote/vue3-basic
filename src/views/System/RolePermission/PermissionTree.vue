<script setup lang="ts">
import { getRolePermission, updateRolePermission } from '@/api/user';
import type { Role, Permission } from '@/api/user';
import { treeForEach } from '@/utils/dataFactory';
import {
  ElTable,
  ElTableColumn,
  ElCheckbox,
  ElButton,
  ElMessage,
} from 'element-plus';
import { toRaw, watch, ref, nextTick } from 'vue';

const props = defineProps<{
  role: Role | undefined;
}>();

const tableRef = ref<InstanceType<typeof ElTable>>();
// 数据展示
const tableData = ref<Permission[]>([]);
const parentMap = new WeakMap<Permission, Permission>();
watch(
  () => props.role,
  async () => {
    const tabelInstance = tableRef.value!;
    if (!props.role?.id) return;
    getRolePermission({ roleId: props.role.id }).then(({ data: { data } }) => {
      tableData.value = data;
      treeForEach(tableData.value, (node, parent) => {
        if (parent) parentMap.set(toRaw(node), parent);
        nextTick(() => tabelInstance.toggleRowSelection(node, node.has));
      });
    });
  },
);

// 提交
async function submit() {
  const permissions: string[] = [];
  treeForEach(tableData.value, (node) => {
    if (node.has) permissions.push(node.code);
  });
  updateRolePermission({ userId: props.role!.id, permissions }).then(() =>
    ElMessage.success('权限更新成功'),
  );
}

function changePermission(row: Permission) {
  if (row.has) {
    const parent = parentMap.get(toRaw(row));
    if (!parent) return;
    parent.has = true;
    changePermission(parent);
  } else {
    row.children?.forEach((child) => {
      child.has = false;
      changePermission(child);
    });
  }
}
</script>

<template>
  <div class="h-full flex flex-col gap-1">
    <ElTable
      ref="tableRef"
      :data="tableData"
      row-key="code"
      default-expand-all
      show-overflow-tooltip
    >
      <ElTableColumn prop="name" label="名称" />
      <ElTableColumn prop="code" label="权限码" />
      <ElTableColumn label="操作" width="90">
        <template #header>
          <ElButton type="primary" @click="submit">保存</ElButton>
        </template>
        <template #default="{ row }">
          <ElCheckbox
            v-model="row.has"
            @change="changePermission(row)"
          ></ElCheckbox>
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>
