<script setup lang="ts">
import { ElButton } from 'element-plus';
import { useUserStore } from '@/store';
import router from '@/router';

const userStore = useUserStore();
function login() {
  userStore.login('lisnote', 'password123');
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
