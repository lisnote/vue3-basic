<script setup lang="ts">
import { ElButton } from 'element-plus';
import { useStorage } from '@vueuse/core';
import router from '@/router';
import dayjs from '@/utils/date';

function login() {
  const loginInfo = useStorage('loginInfo', {
    expires: +dayjs().add(1, 'day'),
    token: '占位token',
  });
  router.push('/');
}
</script>

<template>
  <div>
    <ElButton @click="login">loggin</ElButton>
  </div>
</template>
