<script setup lang="ts">
import { ElButton, ElMessage } from 'element-plus';
import { ref } from 'vue';
import {
  phoneValidator,
  passwordValidator,
  smsCodeValidator,
} from '@/utils/validator';
import { sendSmsCode, smsCodeType } from '@/apis/basic';
import { signup } from '@/apis/user';
import type { FormInstance, FormItemInstance, FormRules } from 'element-plus';
import { t } from '@/locales';
import { useWatchLang } from '@/hooks/useI18n';

const emit = defineEmits(['success']);

// 表单组件数据
const formRef = ref<FormInstance>();
const formRules: FormRules = {
  phone: { validator: phoneValidator, trigger: 'blur' },
  smsCode: { validator: smsCodeValidator, trigger: 'blur' },
  password: { validator: passwordValidator, trigger: 'blur' },
};
const formData = ref({
  phone: '',
  smsCode: '',
  password: '',
});
// 验证码展示逻辑
const smsCodeAppend = ref(t('views.login.sendSms'));
const sendSmsDisabled = ref(false);
useWatchLang(() => {
  if (!sendSmsDisabled.value) smsCodeAppend.value = t('views.login.sendSms');
});
const smsCodeFormItemRef = ref<FormItemInstance>();
let smsCodeSetTimeout: ReturnType<typeof setTimeout>;
function updateSmsCodeAppend(time = 60) {
  sendSmsDisabled.value = true;
  smsCodeAppend.value = t('views.login.wait60s', [time]);
  const nextSecond = function () {
    smsCodeSetTimeout = setTimeout(() => updateSmsCodeAppend(time - 1), 1000);
  };
  if (time === 0) {
    sendSmsDisabled.value = false;
    smsCodeAppend.value = t('views.login.sendSms');
  } else {
    nextSecond();
  }
}
// 获取验证码
async function sendSmsVerificationCode() {
  const valid = await formRef.value?.validateField('phone').catch(() => false);
  if (!valid && smsCodeFormItemRef.value) {
    smsCodeFormItemRef.value.validateState = 'error';
    smsCodeFormItemRef.value.validateMessage = t(
      'validator.pleaseInputAValidPhoneNumberFirst',
    );
    return;
  }
  updateSmsCodeAppend();
  sendSmsCode({
    phone: formData.value.phone,
    type: smsCodeType.signup,
  })
    .then(() => {
      ElMessage.success(t('views.login.smsSentSuccessfully'));
    })
    .catch(() => {
      clearTimeout(smsCodeSetTimeout);
      updateSmsCodeAppend(0);
    });
}
// 提交表单
async function submit() {
  await formRef.value?.validate();
  await signup({
    phone: formData.value.phone,
    smsCode: formData.value.smsCode,
    password: formData.value.password,
  }).then(() => {
    ElMessage.success(t('views.login.signUpSuccessfully'));
    emit('success');
  });
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
      <ElFormItem ref="smsCodeFormItemRef" prop="smsCode">
        <ElInput
          v-model="formData.smsCode"
          :placeholder="t('views.login.smsCodePlaceholder')"
          maxlength="6"
        >
          <template #append>
            <ElButton
              :disabled="sendSmsDisabled"
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
          type="password"
          :show-password="true"
          :placeholder="t('views.login.passwordPlaceholder')"
        />
      </ElFormItem>
    </ElForm>
    <ElButton type="primary" class="w-full" @click="submit">{{
      t('views.login.signUp')
    }}</ElButton>
  </div>
</template>
