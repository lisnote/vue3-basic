<script setup lang="ts">
import { type Role, updateRole, addRole } from '@/api/user';
import { ElButton, ElCascader, ElDialog, ElMessage } from 'element-plus';
import { ref } from 'vue';

import type { FormInstance, FormRules } from 'element-plus';
import { t } from '@/locales';

const props = withDefaults(
  defineProps<{
    visible: boolean;
    data: Partial<Role & { pid: string }>;
    mode: 'add' | 'edit';
    roleTree: Role[];
  }>(),
  { data: () => ({}) },
);
const emit = defineEmits(['success', 'update:visible']);

const formRef = ref<FormInstance>();
const formData = ref<Partial<{ pid: string; id: string; name: string }>>({});
function loadData() {
  formRef.value?.clearValidate();
  if (props.mode === 'add') {
    formData.value = { pid: props.data.id };
  } else {
    formData.value = { ...props.data };
  }
}
const formRules: FormRules = {
  name: {
    required: true,
    message: () => t('rolePermission.roleNamePlaceholder'),
    trigger: 'blur',
  },
};
async function submit() {
  let valid = false;
  await formRef.value?.validate((value) => (valid = value));
  if (!valid) return;
  const { id = '', name = '', pid } = formData.value;
  if (props.mode === 'add') {
    await addRole({ name, pid }).then(() =>
      ElMessage.success(t('rolePermission.roleAddSuccessfully')),
    );
  } else {
    await updateRole({ id, name, pid }).then(() =>
      ElMessage.success(t('rolePermission.roleEditSuccessfully')),
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
          ? t('rolePermission.addRole')
          : t('rolePermission.editRole')
      "
      width="350"
      :model-value="visible"
      @update:model-value="emit('update:visible', $event)"
      @open="loadData"
    >
      <ElForm
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="100px"
        @keyup.enter="submit"
      >
        <ElFormItem :label="t('rolePermission.parentRole')" prop="pid">
          <ElCascader
            v-model="formData.pid"
            :options="roleTree"
            :props="{
              value: 'id',
              label: 'name',
              checkStrictly: true,
              emitPath: false,
            }"
            clearable
            :show-all-levels="false"
            :placeholder="t('rolePermission.parentRolePlaceholder')"
          />
        </ElFormItem>
        <ElFormItem :label="t('rolePermission.roleName')" prop="name">
          <ElInput
            v-model="formData.name"
            :placeholder="t('rolePermission.roleNamePlaceholder')"
          />
        </ElFormItem>
      </ElForm>
      <template #footer>
        <div>
          <ElButton @click="emit('update:visible', false)">
            {{ t('button.cancel') }}
          </ElButton>
          <ElButton @click="submit">{{ t('button.confirm') }}</ElButton>
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
