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
  { node: { data } }: { node: { data: Role } },
) {
  return (
    <div class="flex-1 h-full flex justify-between items-center">
      <div class="flex-1" onClick={() => nodeClick(data)}>
        {data.name}
      </div>
      <ElDropdown tabindex="">
        {{
          default: () => (
            <div>
              <Icon icon="ep:more-filled" class="h-full" />
            </div>
          ),
          dropdown: () => [
            <ElDropdownItem onClick={() => addNode(data)}>新增</ElDropdownItem>,
            <ElDropdownItem onClick={() => editNode(data)}>
              编辑
            </ElDropdownItem>,
            <ElDropdownItem onClick={() => removeNode(data)}>
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
  editRoleVisible.value = true;
  editRoleData.value = role;
  editRoleMode.value = 'add';
}
function editNode(role: Role) {
  editRoleVisible.value = true;
  editRoleData.value = role;
  editRoleMode.value = 'edit';
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
const editRoleData = ref<Role>();
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
