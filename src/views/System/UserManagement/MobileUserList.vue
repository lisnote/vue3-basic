<script lang="ts" setup>
import commonStyle from '@/styles/common.module.scss';
import { User, getUsers } from '@/apis/user';
import EditUser from './EditUser.vue';
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { ElImage } from 'element-plus';

// 查询参数
const searchValue = ref('');
const paging = ref({ page: 1, count: 0 });
// 加载数据
const tableData = ref<User[]>([]);
const tableLoading = ref(true);
function loadTableData() {
  getUsers({
    limit: 50,
    page: paging.value.page,
    search: searchValue.value,
  }).then(({ data: { data, count } }) => {
    tableData.value = data;
    paging.value.count = count;
  });
}
loadTableData();
</script>

<template>
  <div :class="commonStyle.contentArea" class="flex flex-col">
    <ElInput type="search" class="mb-10px">
      <template #suffix>
        <Icon icon="ep:search" width="20" class="cursor-pointer" />
      </template>
    </ElInput>
    <div class="flex-1 overflow-auto flex flex-col">
      <div
        v-for="(item, index) of tableData"
        :key="index"
        class="flex gap-3 p2 cursor-pointer"
        border="b-solid b-1px $el-border-color"
      >
        <ElImage
          :src="item.avatar"
          loading="lazy"
          class="w-10 rounded-full flex"
        />
        <div class="flex-1 flex justify-between items-center">
          <div>
            <div>
              <span class="font-bold">{{ item.name }}</span>
              <span class="text-$el-color-info">({{ item.role }})</span>
            </div>
            <div>{{ item.email }}</div>
          </div>
        </div>
      </div>
      <div class="flex justify-center p-2">
        {{ tableLoading ? '正在加载更多...' : '已加载全部' }}
      </div>
    </div>
  </div>
</template>
