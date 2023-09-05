<script setup lang="ts">
import { type FormInstance, FormRules } from 'element-plus';
import { ElButton } from 'element-plus';
import { useUserStore } from '@/store';
import { Icon } from '@iconify/vue';
import router from '@/router';
import { ref } from 'vue';
const userStore = useUserStore();

// form
const formRef = ref<FormInstance>();
const formRules: FormRules = {};
const formData = ref({
  name: 'admin',
  password: 'admin123',
});
async function login() {
  let valid = false;
  await formRef.value?.validate((value) => (valid = value));
  if (!valid) return;
  await userStore.login(formData.value.name, formData.value.password);
  router.push('/Dashboard');
}
const passwordVisible = ref(false);
</script>

<template>
  <div class="w-full">
    <ElForm ref="formRef" :model="formData" :rules="formRules">
      <ElFormItem prop="name">
        <ElInput v-model="formData.name" placeholder="请输入手机号" />
      </ElFormItem>
      <ElFormItem prop="password">
        <ElInput
          v-model="formData.password"
          :type="passwordVisible ? 'text' : 'password'"
          placeholder="请输入密码"
        >
          <template #suffix>
            <Icon
              :icon="passwordVisible ? 'ep:hide' : 'ep:view'"
              @click="passwordVisible = !passwordVisible"
            />
          </template>
        </ElInput>
      </ElFormItem>
    </ElForm>
    <ElButton class="w-full" @click="login">登录</ElButton>
  </div>
</template>
