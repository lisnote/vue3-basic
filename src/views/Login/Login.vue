<script setup lang="ts">
import { ElButton } from 'element-plus';
import { useStorage } from '@vueuse/core';
import router from '@/router';
import dayjs from '@/utils/date';

function login() {
  const _loginInfo = useStorage('loginInfo', {
    expires: +dayjs().add(1, 'day'),
    token: '占位token',
  });
  router.push('/');
}
</script>

<template>
  <div class="login">
    <ElButton @click="login">loggin</ElButton>
  </div>
</template>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
