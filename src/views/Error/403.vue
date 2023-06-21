<script setup lang="ts">
import { ElButton } from 'element-plus';
import NoAccess from '@/assets/status/403.svg?component';
</script>

<template>
  <div class="flex justify-center items-center h-screen-sm">
    <NoAccess />
    <div class="ml-12">
      <p
        v-motion
        class="font-medium text-4xl mb-4"
        :initial="{
          opacity: 0,
          y: 100,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 100,
          },
        }"
      >
        403
      </p>
      <p
        v-motion
        class="mb-4 text-gray-500"
        :initial="{
          opacity: 0,
          y: 100,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 300,
          },
        }"
      >
        抱歉，你无权访问该页面
      </p>
      <ElButton
        v-motion
        :initial="{
          opacity: 0,
          y: 100,
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 500,
          },
        }"
        type="primary"
        @click="$router.push('/')"
      >
        返回首页
      </ElButton>
    </div>
  </div>
</template>
