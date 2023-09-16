<script setup lang="ts">
import NoExist from '@/assets/status/404.svg?component';
import { ElButton } from 'element-plus';
</script>

<template>
  <div class="flex flex-wrap justify-center items-center h-screen-sm">
    <NoExist />
    <div class="ml-12">
      <p class="font-medium text-4xl mb-4">404</p>
      <p class="mb-4 text-gray-500">抱歉，你访问的页面不存在</p>
      <ElButton type="primary" @click="$router.push('/')">返回首页</ElButton>
    </div>
  </div>
</template>
