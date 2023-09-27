<script setup lang="tsx">
import { getRoleTree, type Role } from '@/api/user';
import { ElTree, ElDropdown, ElDropdownItem, ElMessageBox } from 'element-plus';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

const emit = defineEmits({
  'node-click': (role: Role) => role,
});

// tree prop
function renderContent(
  _h: never,
  { node: { data } }: { node: { data: Role } },
) {
  return (
    <div class="flex-1 h-full flex justify-between">
      <div class="flex-1 flex items-center" onClick={() => nodeClick(data)}>
        {data.name}
      </div>
      <ElDropdown>
        {{
          default: () => (
            <div class="flex items-center">
              <Icon icon="ep:more-filled" class="select-none" />
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
getRoleTree().then(({ data: { data } }) => {
  treeData.value = data;
});
// tree event
function nodeClick(role: Role) {
  emit('node-click', role);
}
function addNode(role: Role) {
  console.log('addNode', role);
}
function editNode(role: Role) {
  console.log('editNode', role);
}
function removeNode(role: Role) {
  ElMessageBox.confirm(`确认删除职位: ${role.name}?`).then(() => {
    console.log('removeNode', role);
  });
}
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
  </ElScrollbar>
</template>
<style lang="scss" scoped>
:deep(.el-tree) {
  .el-tree-node__children {
    overflow: visible;
  }
}
</style>
