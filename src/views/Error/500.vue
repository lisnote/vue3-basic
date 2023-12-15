<script setup lang="ts">
import { ElButton } from '@/components/ElementPlus';
import NoServer from '@/assets/status/500.svg?component';
</script>

<template>
  <div class="flex flex-wrap justify-center items-center h-screen-sm">
    <NoServer />
    <div class="ml-12">
      <p class="font-medium text-4xl mb-4">500</p>
      <p class="mb-4 text-gray-500">抱歉，服务器出错了</p>
      <ElButton type="primary" @click="$router.push('/')">返回首页</ElButton>
    </div>
  </div>
</template>
