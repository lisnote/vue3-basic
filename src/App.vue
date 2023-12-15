<script setup lang="ts">
import { ElConfigProvider } from '@/components/ElementPlus';
import { ref } from 'vue';
import { useWatchLang } from '@/hooks/useI18n';
import { lang } from '@/locales';
// 获取 element 语言包
const elMessagesModules = Object.fromEntries(
  Object.entries(
    import.meta.glob('@root/node_modules/element-plus/dist/locale/*.min.mjs', {
      import: 'default',
    }),
  ).map(([key, value]) => [key.replace(/.*\/(.*)\.min\.mjs$/, '$1'), value]),
);
// 设定语言
const elMessages = ref();
useWatchLang(
  async (newLang) => {
    const msg = await elMessagesModules[newLang.toLowerCase()]();
    if (lang.value === newLang) elMessages.value = msg;
  },
  { immediate: true },
);
</script>
<template>
  <ElConfigProvider :locale="elMessages">
    <RouterView v-slot="{ Component }">
      <Transition name="fade-left">
        <component :is="Component" class="w-full" />
      </Transition>
    </RouterView>
  </ElConfigProvider>
</template>

<style lang="scss" scoped>
@use '@/styles/animate.scss';
</style>
