<script setup lang="ts">
import { ElButton } from 'element-plus';
import NoServer from '@/assets/status/500.svg?component';
</script>

<template>
  <div class="flex justify-center items-center h-screen-sm">
    <NoServer />
    <div class="ml-12">
      <p
        v-motion
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
        class="font-medium text-4xl mb-4"
      >
        500
      </p>
      <p
        v-motion
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
        class="mb-4 text-gray-500"
      >
        抱歉，服务器出错了
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
