<script setup lang="ts">
import { useUserStore, useStyleStore } from '@/store';
import { langs, lang } from '@/locales';
import { Icon } from '@iconify/vue';
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';
import pkg from '@root/package.json';
import router from '@/router';
import { themeMap, switchTheme } from '@/utils/theme';
import { t } from '@/locales';
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
      <div>
        <Icon icon="ep:bell" width="20" class="mx-10px cursor-pointer" />
      </div>
      <ElDropdown trigger="click" tabindex="" class="cursor-pointer">
        <div><Icon icon="cil:language" width="20" class="mx-10px" /></div>
        <template #dropdown>
          <ElDropdownMenu v-for="(value, key) of langs" :key="key">
            <ElDropdownItem @click="lang = key">{{ value }}</ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
      <ElDropdown trigger="click">
        <span class="cursor-pointer">
          <div class="navigator-action">
            <img class="w-10 rounded-1/2" :src="userStore.avatar" />
            <span v-show="styleStore.deviceMode !== 'mobild'">
              {{ userStore.name }}
            </span>
          </div>
        </span>
        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem>{{ t('nav.profile') }}</ElDropdownItem>
            <ElDropdown placement="left" trigger="click" class="block">
              <div>
                <ElDropdownItem>{{ t('nav.theme') }}</ElDropdownItem>
              </div>
              <template #dropdown>
                <ElDropdownMenu>
                  <ElDropdownItem
                    v-for="(theme, key) of themeMap"
                    :key="key"
                    @click="switchTheme(key)"
                  >
                    {{ t(theme.name) }}
                  </ElDropdownItem>
                </ElDropdownMenu>
              </template>
            </ElDropdown>
            <ElDropdownItem divided @click="logout">{{
              t('nav.signOut')
            }}</ElDropdownItem>
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
    text-decoration: none;
    color: var(--el-color-primary);
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
