<script setup lang="ts">
import { ElButton } from 'element-plus';
import NoAccess from '@/assets/status/403.svg?component';
</script>

<template>
  <div class="flex flex-wrap justify-center items-center h-screen-sm">
    <NoAccess />
    <div class="ml-12">
      <p class="font-medium text-4xl mb-4">403</p>
      <p class="mb-4 text-gray-500">抱歉，你无权访问该页面</p>
      <ElButton type="primary" @click="$router.push('/')">返回首页</ElButton>
    </div>
  </div>
</template>
