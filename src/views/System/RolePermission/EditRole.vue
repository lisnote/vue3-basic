<script setup lang="ts">
import { type Role, updateRole, addRole } from '@/api/user';
import { ElButton, ElCascader, ElDialog, ElMessage } from 'element-plus';
import { ref } from 'vue';

import type { FormInstance, FormRules } from 'element-plus';

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
  name: { required: true, message: '请输入职位名称', trigger: 'blur' },
};
async function submit() {
  let valid = false;
  await formRef.value?.validate((value) => (valid = value));
  if (!valid) return;
  const { id = '', name = '', pid } = formData.value;
  if (props.mode === 'add') {
    addRole({ name, pid }).then(() => ElMessage.success('新增职位成功'));
  } else {
    updateRole({ id, name, pid }).then(() => ElMessage.success('编辑职位成功'));
  }
  emit('update:visible', false);
}
</script>

<template>
  <div>
    <ElDialog
      :title="mode === 'add' ? '新增职位' : '编辑职位'"
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
        <ElFormItem label="上级职位" prop="pid">
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
            placeholder="请选择上级职位"
          />
        </ElFormItem>
        <ElFormItem label="职位名称" prop="name">
          <ElInput v-model="formData.name" placeholder="请输入职位名称" />
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
  .el-cascader.el-tooltip__trigger {
    flex: 1 auto;
  }

  .el-dialog__body {
    padding: 0 20px;
  }
}
</style>
