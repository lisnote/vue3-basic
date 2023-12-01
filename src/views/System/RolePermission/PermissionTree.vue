<script setup lang="ts">
import { getRolePermission, updateRolePermission } from '@/apis/user';
import type { Role, Permission } from '@/apis/user';
import { notPermission } from '@/hooks/usePermission';
import { t } from '@/locales';
import { useUserStore } from '@/store';
import { treeForEach } from '@/utils/dataFactory';
import { ElTable, ElTableColumn, ElCheckbox, ElMessage } from 'element-plus';
import { debounce } from 'lodash-es';
import { toRaw, watch, ref, nextTick } from 'vue';

const props = defineProps<{
  role: Role | undefined;
}>();

const userStore = useUserStore();
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
const submit = debounce(async function submit() {
  const permissions: string[] = [];
  treeForEach(tableData.value, (node) => {
    if (node.has) permissions.push(node.code);
  });
  updateRolePermission({ roleId: props.role!.id, permissions }).then(() =>
    ElMessage.success(t('rolePermission.permissionUpdateSuccessfully')),
  );
}, 1000);
function changePermission(row: Permission) {
  if (row.has) {
    const parent = parentMap.get(toRaw(row));
    if (parent) {
      parent.has = true;
      changePermission(parent);
    }
  } else {
    row.children?.forEach((child) => {
      child.has = false;
      changePermission(child);
    });
  }
  submit();
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
      <ElTableColumn prop="name" :label="t('rolePermission.permissionName')" />
      <ElTableColumn prop="code" :label="t('rolePermission.permissionCode')" />
      <ElTableColumn :label="t('rolePermission.handle')" width="90">
        <template #default="{ row }">
          <ElCheckbox
            v-model="row.has"
            :disabled="
              notPermission('RolePermission/updatePermission') ||
              notPermission(row.code) ||
              role?.id === userStore.roleId
            "
            @change="changePermission(row)"
          ></ElCheckbox>
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>
