<script setup lang="ts">
import { useUserStore, useStyleStore } from '@/store';
import { langs, lang, t } from '@/locales';
import { Icon } from '@iconify/vue';
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';
import pkg from '@root/package.json';
import router from '@/router';
import { themeMap, switchTheme } from '@/utils/theme';
const userStore = useUserStore();
const styleStore = useStyleStore();
async function logout() {
  await userStore.logout();
  router.push('/Login');
}
</script>
<template>
  <nav class="navigator">
    <div
      v-show="styleStore.deviceMode === 'mobild'"
      @click="styleStore.sidebarToggle"
    >
      <Transition name="flip" mode="out-in">
        <Icon
          :key="styleStore.sidebarVisible.toString()"
          :icon="styleStore.sidebarVisible ? 'ep:fold' : 'ep:expand'"
          width="20"
          class="mx-1"
        />
      </Transition>
    </div>
    <RouterLink
      v-show="styleStore.deviceMode === 'pc'"
      to="/"
      class="project-name"
    >
      {{ pkg.name }}
    </RouterLink>
    <div class="flex items-center">
      <ElDropdown trigger="click" tabindex="">
        <div><Icon icon="cil:language" width="20" class="mx-1" /></div>
        <template #dropdown>
          <ElDropdownMenu v-for="(value, key) of langs" :key="key">
            <ElDropdownItem @click="lang = key">{{ value }}</ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
      <ElDropdown trigger="click">
        <span class="el-dropdown-link">
          <div class="navigator-action">
            <img class="w-10 rounded-1/2" :src="userStore.avatar" />
            <span>{{ userStore.name }}</span>
          </div>
        </span>
        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem>用户中心</ElDropdownItem>
            <ElDropdown placement="left" trigger="click">
              <div><ElDropdownItem>切换主题</ElDropdownItem></div>
              <template #dropdown>
                <ElDropdownMenu>
                  <ElDropdownItem
                    v-for="(theme, key) of themeMap"
                    :key="key"
                    @click="switchTheme(key)"
                  >
                    {{ theme.name }}
                  </ElDropdownItem>
                </ElDropdownMenu>
              </template>
            </ElDropdown>
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
