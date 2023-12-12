<script setup lang="ts">
import { ElButton } from 'element-plus';
import { useUserStore } from '@/store';
import router from '@/router';
import { ref } from 'vue';
import { phoneValidator, passwordValidator } from '@/utils/validator';
import { t } from '@/locales';
import type { FormInstance, FormRules } from 'element-plus';
const userStore = useUserStore();

// 表单组件数据
const formRef = ref<FormInstance>();
const formRules: FormRules = {
  phone: { validator: phoneValidator, trigger: 'blur' },
  password: { validator: passwordValidator, trigger: 'blur' },
};
const formData = ref({
  phone: '18888888888',
  password: 'admin123',
});
async function submit() {
  let valid = false;
  await formRef.value?.validate((value) => (valid = value));
  if (!valid) return;
  await userStore.login(formData.value.phone, formData.value.password);
  router.push('/Dashboard');
}
</script>

<template>
  <div class="w-full">
    <ElForm
      ref="formRef"
      :model="formData"
      :rules="formRules"
      @keyup.enter="submit"
    >
      <ElFormItem prop="phone">
        <ElInput
          v-model="formData.phone"
          :placeholder="t('views.login.phonePlaceholder')"
        />
      </ElFormItem>
      <ElFormItem prop="password">
        <ElInput
          v-model="formData.password"
          type="password"
          :show-password="true"
          :placeholder="t('views.login.passwordPlaceholder')"
        />
      </ElFormItem>
    </ElForm>
    <ElButton type="primary" class="w-full" @click="submit">{{
      t('views.login.signIn')
    }}</ElButton>
  </div>
</template>
