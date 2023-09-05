<script setup lang="ts">
import { ElButton } from 'element-plus';
import { useUserStore } from '@/store';
import router from '@/router';
const userStore = useUserStore();
function login() {
  userStore.login('lisnote', 'password123');
  router.push('/Dashboard');
}
</script>

<template>
  <ElButton @click="login">loggin</ElButton>
</template>
