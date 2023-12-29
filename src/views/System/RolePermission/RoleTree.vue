<script setup lang="ts">
import { getRoleTree, removeRoles, type Role } from '@/apis/user';
import {
  ElTree,
  ElDropdown,
  ElDropdownItem,
  ElMessageBox,
  ElMessage,
  ElButton,
} from '@/components/ElementPlus';
import { Icon } from '@iconify/vue';
import { ref, nextTick } from 'vue';
import EditRole from './EditRole.vue';
import { hasPermission } from '@/hooks/usePermission';
import { t } from '@/locales';

const emit = defineEmits({
  'node-click': (role: Role) => role,
});

// tree data
const treeData = ref<Role[]>([]);
const currentNodeKey = ref('');
async function loadData() {
  getRoleTree().then(({ data: { data } }) => {
    treeData.value = data;
    nextTick(() => (currentNodeKey.value = data[0].id));
    emit('node-click', data[0]);
  });
}
loadData();
// tree event
function nodeClick(role: Role) {
  emit('node-click', role);
}
function addNode(role?: Role) {
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
  <div class="h-full flex flex-col">
    <ElButton type="primary" class="mb-10px" @click="addNode()">
      {{ t('views.rolePermission.addRole') }}
    </ElButton>
    <ElScrollbar>
      <ElTree
        :data="treeData"
        default-expand-all
        :expand-on-click-node="false"
        draggable
        highlight-current
        node-key="id"
        :current-node-key="currentNodeKey"
      >
        <template
          #default="{
            node: {
              data: role,
              parent: { data: parent },
            },
          }"
        >
          <div class="flex-1 h-full flex justify-between items-center">
            <div class="flex-1" @click="nodeClick(role)">{{ role.name }}</div>
          </div>
          <ElDropdown
            v-if="
              hasPermission('RolePermission/addRole') ||
              hasPermission('RolePermission/updateRole') ||
              hasPermission('RolePermission/removeRole')
            "
            tabindex=""
          >
            <div>
              <Icon icon="ep:more-filled" class="h-full" />
            </div>
            <template #dropdown>
              <ElDropdownItem
                v-if="hasPermission('RolePermission/addRole')"
                @click="addNode(role)"
              >
                {{ t('button.add') }}
              </ElDropdownItem>
              <ElDropdownItem
                v-if="hasPermission('RolePermission/updateRole')"
                @click="editNode(role, parent)"
              >
                {{ t('button.edit') }}
              </ElDropdownItem>
              <ElDropdownItem
                v-if="hasPermission('RolePermission/removeRole')"
                @click="removeNode(role)"
              >
                {{ t('button.delete') }}
              </ElDropdownItem>
            </template>
          </ElDropdown>
        </template>
      </ElTree>
    </ElScrollbar>
  </div>
  <EditRole
    v-model:visible="editRoleVisible"
    :data="editRoleData"
    :mode="editRoleMode"
    :role-tree="treeData"
  />
</template>
<style lang="scss" scoped>
:deep(.el-tree) {
  .el-tree-node__children {
    overflow: visible;
  }
}
</style>
