<script setup lang="ts">
import noExist from '@/assets/status/404.svg';
</script>

<template>
  <div class="flex justify-center items-center h-screen-sm">
    <noExist />
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
        404
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
        抱歉，你访问的页面不存在
      </p>
      <el-button
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
      </el-button>
    </div>
  </div>
</template>
