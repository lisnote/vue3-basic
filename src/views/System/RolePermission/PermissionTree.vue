<script setup lang="ts">
import { getRolePermission, updateRolePermission } from '@/apis/user';
import type { Role, Permission } from '@/apis/user';
import { notPermission } from '@/hooks/usePermission';
import { t } from '@/locales';
import { useUserStore } from '@/store';
import { treeTraverse } from '@/utils/dataFactory';
import {
  ElTable,
  ElTableColumn,
  ElCheckbox,
  ElMessage,
} from '@/components/ElementPlus';
import { debounce } from 'lodash-es';
import { watch, ref } from 'vue';

const props = defineProps<{
  role: Role | undefined;
}>();

const userStore = useUserStore();
// 数据展示
const tableData = ref<Permission[]>([]);
watch(
  () => props.role,
  async () => {
    if (!props.role?.id) return;
    submit.flush();
    getRolePermission({ roleId: props.role.id }).then(({ data: { data } }) => {
      tableData.value = data;
      treeTraverse(tableData.value, (node, parent) => {
        node.parent = parent;
      });
      updateIndeterminate();
    });
  },
);
// 更新中间态
const updateIndeterminate = debounce(() => {
  treeTraverse(tableData.value, (node) => {
    node.indeterminate =
      node.has &&
      node.children?.reduce((pre, current) => {
        return pre || !current.has || current.indeterminate === true;
      }, false);
  });
}, 0);

// 提交
const submit = debounce(async function submit(roleId: string) {
  const permissions: string[] = [];
  treeTraverse(tableData.value, (node) => {
    if (node.has) permissions.push(node.code);
  });
  updateRolePermission({ roleId: roleId, permissions }).then(() =>
    ElMessage.success(t('views.rolePermission.permissionUpdateSuccessfully')),
  );
}, 1000);
function changePermission(row: Permission) {
  if (row.has) {
    if (row.parent) {
      row.parent.has = true;
      changePermission(row.parent);
    }
  } else if (row.children && row.indeterminate) {
    row.has = true;
    treeTraverse(row.children, (node) => (node.has = true));
  } else if (row.children) {
    treeTraverse(row.children, (node) => (node.has = false));
  }
  updateIndeterminate();
  submit(props.role!.id);
}
</script>

<template>
  <div class="h-full flex flex-col gap-1">
    <ElTable
      :data="tableData"
      row-key="code"
      default-expand-all
      show-overflow-tooltip
    >
      <ElTableColumn
        prop="name"
        :label="t('views.rolePermission.permissionName')"
      />
      <ElTableColumn
        prop="code"
        :label="t('views.rolePermission.permissionCode')"
      />
      <ElTableColumn :label="t('views.rolePermission.handle')" width="90">
        <template #default="{ row }: { row: Permission }">
          <ElCheckbox
            v-model="row.has"
            :disabled="
              notPermission('RolePermission/updatePermission') ||
              notPermission(row.code) ||
              role?.id === userStore.roleId
            "
            :indeterminate="row.indeterminate"
            @change="changePermission(row)"
          ></ElCheckbox>
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>
