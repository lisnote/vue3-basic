<script setup lang="ts">
import { ElButton } from 'element-plus';
import { useUserStore } from '@/store';
import { Icon } from '@iconify/vue';
import router from '@/router';
import { ref } from 'vue';
import { accountValidator, passwordValidator } from '@/utils/validator';
import type { FormInstance, FormRules } from 'element-plus';
const userStore = useUserStore();

// form
const formRef = ref<FormInstance>();
const formRules: FormRules = {
  name: { validator: accountValidator, trigger: 'blur' },
  password: { validator: passwordValidator, trigger: 'blur' },
};
const formData = ref({
  name: 'admin',
  password: 'admin123',
});
const passwordVisible = ref(false);
async function submit() {
  let valid = false;
  await formRef.value?.validate((value) => (valid = value));
  if (!valid) return;
  await userStore.login(formData.value.name, formData.value.password);
  router.push('/Dashboard');
}
</script>

<template>
  <div class="w-full">
    <ElForm ref="formRef" :model="formData" :rules="formRules">
      <ElFormItem prop="name">
        <ElInput v-model="formData.name" placeholder="请输入用户名" />
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
    <ElButton class="w-full" @click="submit">登录</ElButton>
  </div>
</template>
