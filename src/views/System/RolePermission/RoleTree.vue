<script setup lang="tsx">
import { getRoleTree, removeRoles, type Role } from '@/api/user';
import {
  ElTree,
  ElDropdown,
  ElDropdownItem,
  ElMessageBox,
  ElMessage,
} from 'element-plus';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import EditRole from './EditRole.vue';

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
      <ElDropdown tabindex="">
        {{
          default: () => (
            <div>
              <Icon icon="ep:more-filled" class="h-full" />
            </div>
          ),
          dropdown: () => [
            <ElDropdownItem onClick={() => addNode(role)}>新增</ElDropdownItem>,
            <ElDropdownItem onClick={() => editNode(role, parent)}>
              编辑
            </ElDropdownItem>,
            <ElDropdownItem onClick={() => removeNode(role)}>
              删除
            </ElDropdownItem>,
          ],
        }}
      </ElDropdown>
    </div>
  );
}
// tree data
const treeData = ref<Role[]>([]);
async function loadData() {
  getRoleTree().then(({ data: { data } }) => {
    treeData.value = data;
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
  ElMessageBox.confirm(`确定删除${role.name}?`)
    .then(() => {
      return removeRoles([role.id]);
    })
    .then(() => ElMessage.success('删除成功'));
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
      :render-content="renderContent"
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
