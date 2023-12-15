<script setup lang="tsx">
import { getRoleTree, removeRoles, type Role } from '@/apis/user';
import {
  ElTree,
  ElDropdown,
  ElDropdownItem,
  ElMessageBox,
  ElMessage,
} from '@/components/ElementPlus';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import EditRole from './EditRole.vue';
import { hasPermission } from '@/hooks/usePermission';
import { t } from '@/locales';

const emit = defineEmits({
  'node-click': (role: Role) => role,
});

// tree prop
function renderContent(
  _h: never,
  {
    node: {
      data: role,
      parent: { data: parent },
    },
  }: { node: { data: Role; parent: { data: Role } } },
) {
  return (
    <div class="flex-1 h-full flex justify-between items-center">
      <div class="flex-1" onClick={() => nodeClick(role)}>
        {role.name}
      </div>
      {hasPermission('RolePermission/addRole') ||
      hasPermission('RolePermission/updateRole') ||
      hasPermission('RolePermission/removeRole') ? (
        <ElDropdown tabindex="">
          {{
            default: () => (
              <div>
                <Icon icon="ep:more-filled" class="h-full" />
              </div>
            ),
            dropdown: () => [
              hasPermission('RolePermission/addRole') ? (
                <ElDropdownItem onClick={() => addNode(role)}>
                  {t('button.add')}
                </ElDropdownItem>
              ) : undefined,
              hasPermission('RolePermission/updateRole') ? (
                <ElDropdownItem onClick={() => editNode(role, parent)}>
                  {t('button.edit')}
                </ElDropdownItem>
              ) : undefined,
              hasPermission('RolePermission/removeRole') ? (
                <ElDropdownItem onClick={() => removeNode(role)}>
                  {t('button.delete')}
                </ElDropdownItem>
              ) : undefined,
            ],
          }}
        </ElDropdown>
      ) : undefined}
    </div>
  );
}
// tree data
const treeData = ref<Role[]>([]);
const currentNodeKey = ref('');
async function loadData() {
  getRoleTree().then(({ data: { data } }) => {
    treeData.value = data;
    currentNodeKey.value = data[0].id;
    emit('node-click', data[0]);
  });
}
loadData();
// tree event
function nodeClick(role: Role) {
  emit('node-click', role);
}
function addNode(role: Role) {
  editRoleData.value = role;
  editRoleMode.value = 'add';
  editRoleVisible.value = true;
}
function editNode(role: Role, parent: Role) {
  editRoleData.value = { ...role, pid: parent.id };
  editRoleMode.value = 'edit';
  editRoleVisible.value = true;
}
function removeNode(role: Role) {
  ElMessageBox.confirm(t('button.deleteConfirm', [role.name])).then(
    async () => {
      await removeRoles([role.id]);
      ElMessage.success(t('views.rolePermission.roleDeleteSuccessfully'));
    },
  );
}
// EditRole
const editRoleVisible = ref(false);
const editRoleData = ref<Role & { pid?: string }>();
const editRoleMode = ref<'add' | 'edit'>('add');
</script>

<template>
  <ElScrollbar>
    <ElTree
      :data="treeData"
      default-expand-all
      :expand-on-click-node="false"
      draggable
      highlight-current
      :render-content="renderContent"
      node-key="id"
      :current-node-key="currentNodeKey"
    />
    <EditRole
      v-model:visible="editRoleVisible"
      :data="editRoleData"
      :mode="editRoleMode"
      :role-tree="treeData"
    />
  </ElScrollbar>
</template>
<style lang="scss" scoped>
:deep(.el-tree) {
  .el-tree-node__children {
    overflow: visible;
  }
}
</style>
