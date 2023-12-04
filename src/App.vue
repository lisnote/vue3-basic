<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import { ref } from 'vue';
import { useWatchLang } from '@/hooks/useI18n';
// 获取 element 语言包
const elementLangModules = Object.fromEntries(
  Object.entries(
    import.meta.glob('@root/node_modules/element-plus/dist/locale/*.min.mjs', {
      import: 'default',
    }),
  ).map(([key, value]) => [key.replace(/.*\/(.*)\.min\.mjs$/, '$1'), value]),
);
// 设定语言
const elementLang = ref();
useWatchLang(
  (lang) =>
    elementLangModules[lang.toLowerCase()]().then(
      (newLang) => (elementLang.value = newLang),
    ),
  { immediate: true },
);
</script>
<template>
  <ElConfigProvider :locale="elementLang">
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
