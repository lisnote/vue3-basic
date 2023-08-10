<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
</script>
<template>
  <ElConfigProvider :locale="zhCn">
    <RouterView v-slot="{ Component }">
      <transition name="fade-left">
        <component :is="Component" class="w-full" />
      </transition>
    </RouterView>
  </ElConfigProvider>
</template>

<style lang="scss" scoped>
@use "@/styles/animate.scss";
</style>
