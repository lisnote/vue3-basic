<script setup lang="ts">
import { getRoleTree, inviteUser, updateUser } from '@/api/user';
import type { User, Role } from '@/api/user';
import { ElButton, ElCascader, ElDialog, ElMessage } from 'element-plus';
import { ref } from 'vue';

import type { FormInstance, FormRules } from 'element-plus';
import { phoneValidator } from '@/utils/validator';

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
  roleId: { required: true, message: '请选择职位', trigger: 'blur' },
};
async function submit() {
  let valid = false;
  await formRef.value?.validate((value) => (valid = value));
  if (!valid) return;
  const { roleId, phone } = formData.value;
  if (props.mode === 'add') {
    await inviteUser({ phone: phone!, roleId: roleId! }).then(() =>
      ElMessage.success('邀请用户成功, 等待用户同意'),
    );
  } else {
    await updateUser({ phone: phone!, roleId: roleId! }).then(() =>
      ElMessage.success('编辑用户成功'),
    );
  }
  emit('update:visible', false);
}
</script>

<template>
  <div>
    <ElDialog
      :title="mode === 'add' ? '邀请用户' : '编辑用户'"
      width="300"
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
        <ElFormItem label="电话" prop="phone">
          <ElInput
            v-model="formData.phone"
            placeholder="请输入手机号"
            :disabled="mode === 'edit'"
          />
        </ElFormItem>
        <ElFormItem label="职位" prop="roleId">
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
            placeholder="请选择职位"
          />
        </ElFormItem>
      </ElForm>
      <template #footer>
        <div>
          <ElButton @click="emit('update:visible', false)">取消</ElButton>
          <ElButton @click="submit">确定</ElButton>
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
