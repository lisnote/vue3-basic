<script setup lang="ts">
import LoginForm from './LoginForm.vue';
import SignupForm from './SignupForm.vue';
import ResetForm from './ResetForm.vue';
import { themeMap, switchTheme } from '@/utils/theme';
import { ref } from 'vue';
import pkg from '@root/package.json';

const mode = ref<'login' | 'signup' | 'reset'>('login');
</script>

<template>
  <div class="login">
    <div class="login-box flex justify-center items-center">
      <div class="w-300px flex flex-col gap-3">
        <div class="font-bold text-3xl text-center">
          {{ pkg.name }}
        </div>
        <LoginForm v-show="mode === 'login'" />
        <SignupForm v-show="mode === 'signup'" @success="mode = 'login'" />
        <ResetForm v-show="mode === 'reset'" @success="mode = 'login'" />
        <div class="flex justify-between">
          <template v-if="mode === 'login'">
            <ElLink type="primary" @click="mode = 'signup'">注册账号</ElLink>
            <ElLink type="info" @click="mode = 'reset'">忘记密码</ElLink>
          </template>
          <ElLink v-else type="primary" @click="mode = 'login'">
            返回登录
          </ElLink>
        </div>
      </div>
    </div>
    <div class="absolute right-0 bottom-0 flex gap-3 m-3">
      <div
        v-for="(theme, key) of themeMap"
        :key="key"
        :style="{ background: theme.accentColor }"
        class="w-5 h-5 rounded-lg ring ring-white ring-opacity-10 cursor-pointer"
        @click="switchTheme(key)"
      ></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--el-bg-color-page);

  .login-box {
    background-color: var(--el-bg-color-overlay);
    border: 1px solid var(--el-border-color);
    border-radius: 4px;
    height: 500px;
    width: 400px;
    box-shadow: var(--el-box-shadow-lighter);
  }
}
</style>
