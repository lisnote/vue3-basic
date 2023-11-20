<script setup lang="ts">
import { User, getUsers, removeUsers } from '@/api/user';
import {
  ElTable,
  ElTableColumn,
  ElImage,
  ElButton,
  ElMessage,
} from 'element-plus';
import Pagination from '@/components/Pagination.vue';
import commonStyle from '@/styles/common.module.scss';
import { useUserStore } from '@/store';
import { ref } from 'vue';
import EditUser from './EditUser.vue';

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
    ElMessage.success('删除成功');
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
        placeholder="模糊查询, 请输入"
        class="block"
        @change="loadTableData()"
      />
      <div class="flex">
        <ElButton type="primary" @click="showEditUser('add')">邀请</ElButton>
        <ElButton
          type="danger"
          @click="remove(tableRef?.getSelectionRows() ?? [])"
          >删除</ElButton
        >
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
        :selectable="(row) => row.roleId != '-1'"
      />
      <ElTableColumn width="50" :show-overflow-tooltip="false">
        <template #default="{ row }">
          <ElImage
            :src="row.avatar"
            :preview-src-list="imageList"
            preview-teleported
            hide-on-click-modal
            class="w-30px rounded-1 flex"
          />
        </template>
      </ElTableColumn>
      <ElTableColumn label="用户名" prop="name" />
      <ElTableColumn label="职位" prop="role" />
      <ElTableColumn label="电话" prop="phone" />
      <ElTableColumn label="邮件" prop="email" />
      <ElTableColumn
        label="操作"
        :show-overflow-tooltip="false"
        fixed="right"
        width="180"
      >
        <template #default="{ row }">
          <ElButton
            type="primary"
            size="small"
            link
            @click="showEditUser('edit', row)"
          >
            编辑
          </ElButton>
          <ElButton type="primary" size="small" link @click="remove([row])">
            删除
          </ElButton>
          <ElButton type="primary" size="small" link @click="login(row)">
            登录此账户
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
