<script setup lang="ts">
import { useMainStore, useUserStore, useStylesStore } from '@/store';
import { Icon } from '@iconify/vue';
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';
import router from '@/router';
const mainStore = useMainStore();
const userStore = useUserStore();
const stylesStore = useStylesStore();
async function logout() {
  await userStore.logout();
  router.push('/Login');
}
</script>
<template>
  <nav class="navigator">
    <div class="<md:block hidden" @click="stylesStore.sidebarToggle">
      <Transition name="flip" mode="out-in">
        <Icon
          :key="stylesStore.sidebarVisible.toString()"
          :icon="stylesStore.sidebarVisible ? 'ep:fold' : 'ep:expand'"
          width="20"
          class="mx-1"
        />
      </Transition>
    </div>
    <RouterLink to="/" class="project-name <md:hidden">
      {{ mainStore.projectName }}
    </RouterLink>
    <div>
      <ElDropdown>
        <span class="el-dropdown-link">
          <div class="navigator-action">
            <img
              class="w-10 rounded-1/2"
              src="https://avatars.githubusercontent.com/lisnote"
            />
            <span>lisnote</span>
          </div>
        </span>
        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem>用户中心</ElDropdownItem>
            <ElDropdownItem>更换主题</ElDropdownItem>
            <ElDropdownItem divided @click="logout">退出登录</ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </div>
  </nav>
</template>
<style scoped lang="scss">
@use '@/styles/animate.scss';

.navigator {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 0;
  padding: 10px;

  .project-name {
    font-size: xx-large;
  }

  .navigator-action {
    display: flex;
    align-items: center;

    > * {
      margin: 0 0.5rem;
    }
  }
}
</style>
