<script lang="ts" setup>
import commonStyle from '@/styles/common.module.scss';
import { User, getUsers } from '@/apis/user';
import EditUser from './EditUser.vue';
import { t } from '@/locales';
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { ElButton, ElDrawer, ElImage } from '@/components/ElementPlus';
import { useLogin, useRemoveUsers } from '.';

// 查询参数
const searchValue = ref('');
const paging = ref({ page: 1, count: 0 });
// 加载数据
const tableData = ref<User[]>([]);
const tableLoading = ref(false);
function loadTableData() {
  getUsers({
    limit: 100,
    page: paging.value.page,
    search: searchValue.value,
  }).then(({ data: { data, count } }) => {
    tableData.value = data;
    paging.value.count = count;
  });
}
loadTableData();
// 移除用户
const remove = useRemoveUsers(() => {
  loadTableData();
  drawerVisible.value = false;
});
// 用户登录
const login = useLogin(() => (drawerVisible.value = false));

// 抽屉
const drawerVisible = ref(false);
const drawerData = ref<User>();

// 用户编辑
const editUserVisible = ref(false);
const editUserMode = ref<'add' | 'edit'>('add');
</script>

<template>
  <div :class="commonStyle.contentArea" class="flex flex-col">
    <div class="flex gap-2">
      <ElButton
        type="primary"
        @click="(editUserMode = 'add'), (editUserVisible = true)"
      >
        {{ t('button.add') }}
      </ElButton>
      <ElInput
        v-model="searchValue"
        type="search"
        class="mb-10px"
        placeholder="查询所有用户信息"
        @change="loadTableData"
      >
        <template #suffix>
          <Icon
            icon="ep:search"
            width="20"
            class="cursor-pointer"
            @click="loadTableData"
          />
        </template>
      </ElInput>
    </div>
    <div class="flex-1 overflow-auto flex flex-col">
      <div
        v-for="(item, index) of tableData"
        :key="index"
        class="flex gap-3 p2 cursor-pointer"
        border="b-solid b-1px $el-border-color"
        @click="(drawerVisible = true), (drawerData = item)"
      >
        <ElImage
          :src="item.avatar"
          loading="lazy"
          class="min-w-10 w-10 rounded-full flex"
        />
        <div class="flex-1 flex justify-between items-center">
          <div class="ellipsis">
            <div>
              <span class="font-bold">{{ item.name }}</span>
              <span text="$el-color-info">({{ item.role }})</span>
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
  <ElDrawer
    v-model="drawerVisible"
    direction="btt"
    :with-header="false"
    size=""
  >
    <div class="text-5 flex flex-col gap-3">
      <div>{{ t('views.userManagement.name') }}: {{ drawerData?.name }}</div>
      <div>{{ t('views.userManagement.role') }}: {{ drawerData?.role }}</div>
      <div>{{ t('views.userManagement.phone') }}: {{ drawerData?.phone }}</div>
      <div>{{ t('views.userManagement.email') }}: {{ drawerData?.email }}</div>
    </div>
    <template #footer>
      <div class="flex gap-2">
        <ElLink
          type="primary"
          class="text-5"
          :underline="false"
          @click="(editUserMode = 'edit'), (editUserVisible = true)"
        >
          <Icon icon="ep:edit" />
          <span>{{ t('button.edit') }}</span>
        </ElLink>
        <ElLink
          type="danger"
          class="text-5"
          :underline="false"
          @click="remove([drawerData!])"
        >
          <Icon icon="ep:delete" />
          <span>{{ t('button.delete') }}</span>
        </ElLink>
        <ElLink
          type="primary"
          class="text-5"
          :underline="false"
          @click="login(drawerData!)"
        >
          <Icon icon="ep:user" />
          <span>{{ t('views.userManagement.accessThisAccount') }}</span>
        </ElLink>
      </div>
    </template>
  </ElDrawer>
  <EditUser
    v-model:visible="editUserVisible"
    :data="drawerData"
    :mode="editUserMode"
    @success="loadTableData()"
  />
</template>
