<script setup lang="ts">
import { getRoleTree, inviteUser, updateUser } from '@/apis/user';
import type { User, Role } from '@/apis/user';
import {
  ElButton,
  ElCascader,
  ElDialog,
  ElMessage,
} from '@/components/ElementPlus';
import { ref } from 'vue';

import type { FormInstance, FormRules } from '@/components/ElementPlus';
import { phoneValidator } from '@/utils/validator';
import { t } from '@/locales';

const props = withDefaults(
  defineProps<{
    visible: boolean;
    data: Partial<User>;
    mode: 'add' | 'edit';
  }>(),
  { data: () => ({}) },
);
const emit = defineEmits(['success', 'update:visible']);

const formRef = ref<FormInstance>();
const formData = ref<Pick<User, 'phone' | 'roleId'>>({ phone: '', roleId: '' });
const roleTree = ref<Role[]>();
getRoleTree().then(({ data: { data } }) => {
  roleTree.value = data;
});
function loadData() {
  formRef.value?.clearValidate();
  if (props.mode === 'add') {
    formData.value = { phone: '', roleId: '' };
  } else {
    formData.value = {
      phone: props.data.phone ?? '',
      roleId: props.data.roleId ?? '',
    };
  }
}
const formRules: FormRules = {
  phone: { required: true, validator: phoneValidator, trigger: 'blur' },
  roleId: {
    required: true,
    message: () => t('views.userManagement.rolePlaceholder'),
    trigger: 'blur',
  },
};
async function submit() {
  let valid = false;
  await formRef.value?.validate((value) => (valid = value));
  if (!valid) return;
  const { roleId, phone } = formData.value;
  if (props.mode === 'add') {
    await inviteUser({ phone: phone!, roleId: roleId! }).then(() =>
      ElMessage.success(t('views.userManagement.userAddSuccessfully')),
    );
  } else {
    await updateUser({ phone: phone!, roleId: roleId! }).then(() =>
      ElMessage.success(t('views.userManagement.userEditSuccessfully')),
    );
  }
  emit('update:visible', false);
}
</script>

<template>
  <div>
    <ElDialog
      :title="
        mode === 'add'
          ? t('views.userManagement.addUser')
          : t('views.userManagement.eidtUser')
      "
      width="330"
      :model-value="visible"
      @update:model-value="emit('update:visible', $event)"
      @open="loadData"
    >
      <ElForm
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="80px"
        @keyup.enter="submit"
      >
        <ElFormItem :label="t('views.userManagement.phone')" prop="phone">
          <ElInput
            v-model="formData.phone"
            :placeholder="t('views.userManagement.phonePlaceholder')"
            :disabled="mode === 'edit'"
          />
        </ElFormItem>
        <ElFormItem :label="t('views.userManagement.role')" prop="roleId">
          <ElCascader
            v-model="formData.roleId"
            :options="roleTree"
            :props="{
              value: 'id',
              label: 'name',
              checkStrictly: true,
              emitPath: false,
            }"
            clearable
            :show-all-levels="false"
            :placeholder="t('views.userManagement.rolePlaceholder')"
          />
        </ElFormItem>
      </ElForm>
      <template #footer>
        <div>
          <ElButton @click="emit('update:visible', false)">
            {{ t('button.cancel') }}
          </ElButton>
          <ElButton type="primary" @click="submit">{{
            t('button.confirm')
          }}</ElButton>
        </div>
      </template>
    </ElDialog>
  </div>
</template>
<style lang="scss" scoped>
:deep() {
  .el-dialog__body {
    padding: 0 20px;
  }
}
</style>
