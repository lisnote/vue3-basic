<script setup lang="ts">
import { User, getUserList } from '@/api/user';
import { ElTable, ElTableColumn, ElImage, ElButton } from 'element-plus';
import Pagination from '@/components/Pagination.vue';
import commonStyle from '@/styles/common.module.scss';
import { ref } from 'vue';

const paging = ref({ page: 1, limit: 10, total: 0 });
const tableData = ref<User[]>([]);
const imageList = ref<string[]>([]);
function loadTableData() {
  getUserList({ limit: paging.value.limit, page: paging.value.page }).then(
    ({ data: { data, count } }) => {
      tableData.value = data;
      paging.value.total = count;
      imageList.value = data.map((v) => v.avatar);
    },
  );
}
loadTableData();

function edit(user: User) {
  console.log(user);
}
function remove(user: User) {
  console.log(user);
}
function login(user: User) {
  console.log(user);
}
</script>

<template>
  <div :class="commonStyle.contentArea" class="flex flex-col">
    <ElTable
      ref="tableRef"
      :data="tableData"
      default-expand-all
      show-overflow-tooltip
      class="flex-1"
    >
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
          <ElButton type="primary" size="small" link @click="edit(row)">
            编辑
          </ElButton>
          <ElButton type="primary" size="small" link @click="remove(row)">
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
      class="mt-5px"
      @change="loadTableData()"
    />
  </div>
</template>
