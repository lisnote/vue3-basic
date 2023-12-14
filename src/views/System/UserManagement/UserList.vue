<script setup lang="ts">
import { User, getUsers, removeUsers } from '@/apis/user';
import {
  ElTable,
  ElTableColumn,
  ElImage,
  ElButton,
  ElMessage,
} from 'element-plus';
import { hasPermission } from '@/hooks/usePermission';
import Pagination from '@/components/Pagination.vue';
import commonStyle from '@/styles/common.module.scss';
import { useUserStore } from '@/store';
import { ref } from 'vue';
import EditUser from './EditUser.vue';
import { t } from '@/locales';

const userStore = useUserStore();
// 查询参数
const searchValue = ref('');
// 加载数据
const paging = ref({ page: 1, limit: 10, total: 0 });
const tableRef = ref<InstanceType<typeof ElTable>>();
const tableData = ref<User[]>([]);
const imageList = ref<string[]>([]);
function loadTableData() {
  getUsers({
    limit: paging.value.limit,
    page: paging.value.page,
    search: searchValue.value,
  }).then(({ data: { data, count } }) => {
    tableData.value = data;
    paging.value.total = count;
    imageList.value = data.map((v) => v.avatar);
  });
}
loadTableData();

// 移除用户
function remove(users: User[]) {
  removeUsers(users.map((user) => user.id)).then(() => {
    ElMessage.success(t('views.userManagement.userDeleteSuccessfully'));
    loadTableData();
  });
}
// 切换用户
function login(user: User) {
  userStore.login(user.phone, 'admin123');
}

// 编辑用户
const editUserData = ref<User>();
const editUserVisible = ref(false);
const editUserMode = ref<'add' | 'edit'>('add');
function showEditUser(mode: 'add' | 'edit', user?: User) {
  editUserMode.value = mode;
  editUserData.value = user;
  editUserVisible.value = true;
}
</script>

<template>
  <div :class="commonStyle.contentArea" class="flex flex-col">
    <div class="flex">
      <ElInput
        v-model="searchValue"
        :placeholder="t('views.userManagement.searchAllUserInfo')"
        class="block"
        @change="loadTableData()"
      />
      <div class="flex">
        <ElButton
          v-show="hasPermission('UserManagement/inviteUser')"
          type="primary"
          @click="showEditUser('add')"
        >
          {{ t('button.add') }}
        </ElButton>
        <ElButton
          v-show="hasPermission('UserManagement/removeUser')"
          type="danger"
          :disabled="!tableRef?.getSelectionRows().length"
          @click="remove(tableRef?.getSelectionRows() ?? [])"
        >
          {{ t('button.delete') }}
        </ElButton>
      </div>
    </div>
    <ElTable
      ref="tableRef"
      :data="tableData"
      default-expand-all
      show-overflow-tooltip
      class="flex-1 my-5px"
    >
      <ElTableColumn
        type="selection"
        :selectable="(row) => !(row.roleId === '-1' || row.id === userStore.id)"
      />
      <ElTableColumn width="50" :show-overflow-tooltip="false">
        <template #default="{ row }">
          <ElImage
            :src="row.avatar"
            :preview-src-list="imageList"
            preview-teleported
            hide-on-click-modal
            loading="lazy"
            class="w-30px rounded-full flex"
          />
        </template>
      </ElTableColumn>
      <ElTableColumn :label="t('views.userManagement.name')" prop="name" />
      <ElTableColumn :label="t('views.userManagement.role')" prop="role" />
      <ElTableColumn :label="t('views.userManagement.phone')" prop="phone" />
      <ElTableColumn :label="t('views.userManagement.mail')" prop="email" />
      <ElTableColumn
        :label="t('views.userManagement.handle')"
        :show-overflow-tooltip="false"
        fixed="right"
        :width="230"
      >
        <template #default="{ row }">
          <ElButton
            v-if="
              hasPermission('UserManagement/updateUser') && row.roleId != '-1'
            "
            type="primary"
            size="small"
            link
            @click="showEditUser('edit', row)"
          >
            {{ t('button.edit') }}
          </ElButton>
          <ElButton
            v-if="
              hasPermission('UserManagement/removeUser') && row.roleId != '-1'
            "
            type="danger"
            size="small"
            link
            @click="remove([row])"
          >
            {{ t('button.delete') }}
          </ElButton>
          <ElButton
            v-if="row.id !== userStore.id"
            type="primary"
            size="small"
            link
            @click="login(row)"
          >
            {{ t('views.userManagement.accessThisAccount') }}
          </ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
    <Pagination
      v-model:limit="paging.limit"
      v-model:page="paging.page"
      :total="paging.total"
      @change="loadTableData()"
    />
    <EditUser
      v-model:visible="editUserVisible"
      :data="editUserData"
      :mode="editUserMode"
      @success="loadTableData()"
    />
  </div>
</template>
