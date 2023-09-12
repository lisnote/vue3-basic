<script setup lang="ts">
import { ElButton, ElMessage } from 'element-plus';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import {
  accountValidator,
  passwordValidator,
  smsCodeValidator,
} from '@/utils/validator';
import { sendSmsCode, smsCodeType } from '@/api/basic';
import { resetPassword } from '@/api/user';
import type { FormInstance, FormItemInstance, FormRules } from 'element-plus';

const emit = defineEmits(['success']);

// 表单
const formRef = ref<FormInstance>();
const formRules: FormRules = {
  name: { validator: accountValidator, trigger: 'blur' },
  smsCode: { validator: smsCodeValidator, trigger: 'blur' },
  password: { validator: passwordValidator, trigger: 'blur' },
};
const formData = ref({
  name: '',
  smsCode: '',
  password: '',
});
const passwordVisible = ref(false);
// 验证码
const smsCodeAppend = ref('发送验证码');
const smsCodeFormItemRef = ref<FormItemInstance>();
let smsCodeSetTimeout: ReturnType<typeof setTimeout>;
function updateSmsCodeAppend(time = 60) {
  smsCodeAppend.value = time + '秒后重新发送';
  const nextSecond = function () {
    smsCodeSetTimeout = setTimeout(() => updateSmsCodeAppend(time - 1), 1000);
  };
  if (time === 0) {
    smsCodeAppend.value = '发送验证码';
  } else {
    nextSecond();
  }
}
async function sendSmsVerificationCode() {
  const valid = await formRef.value?.validateField('name').catch(() => false);
  if (!valid && smsCodeFormItemRef.value) {
    smsCodeFormItemRef.value.validateState = 'error';
    smsCodeFormItemRef.value.validateMessage = '请先输入有效的用户名';
    return;
  }
  updateSmsCodeAppend();
  sendSmsCode({
    name: formData.value.name,
    type: smsCodeType.resetPassword,
  })
    .then(() => {
      ElMessage.success('验证码发送成功');
    })
    .catch(() => {
      clearTimeout(smsCodeSetTimeout);
      updateSmsCodeAppend(0);
    });
}
// 提交表单
async function submit() {
  await formRef.value?.validate();
  await resetPassword({
    name: formData.value.name,
    smsCode: formData.value.smsCode,
    password: formData.value.password,
  }).then(() => {
    ElMessage.success('密码重置成功');
    emit('success');
  });
}
</script>

<template>
  <div class="w-full">
    <ElForm ref="formRef" :model="formData" :rules="formRules">
      <ElFormItem prop="name">
        <ElInput v-model="formData.name" placeholder="请输入用户名" />
      </ElFormItem>
      <ElFormItem ref="smsCodeFormItemRef" prop="smsCode">
        <ElInput
          v-model="formData.smsCode"
          placeholder="请输入验证码"
          maxlength="6"
        >
          <template #append>
            <ElButton
              :disabled="smsCodeAppend !== '发送验证码'"
              @click="sendSmsVerificationCode()"
            >
              {{ smsCodeAppend }}
            </ElButton>
          </template>
        </ElInput>
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
    <ElButton class="w-full" @click="submit">重置密码</ElButton>
  </div>
</template>
