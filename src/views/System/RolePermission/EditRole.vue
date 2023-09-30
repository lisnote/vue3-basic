<script setup lang="ts">
import { type Role, updateRole, addRole } from '@/api/user';
import { ElCascader, ElDialog } from 'element-plus';
import { ref } from 'vue';

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

const formData = ref<Partial<{ pid: string; id: string; name: string }>>({});
function loadData() {
  if (props.mode === 'add') {
    formData.value = { pid: props.data.id };
  } else {
    formData.value = { ...props.data };
  }
}
</script>

<template>
  <ElDialog
    :title="mode === 'add' ? '新增职位' : '编辑职位'"
    width="300"
    :model-value="visible"
    @update:model-value="emit('update:visible', $event)"
    @open="loadData"
  >
    <ElForm>
      <ElFormItem label="名称">
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
        />
      </ElFormItem>
      <ElFormItem label="名称">
        <ElInput v-model="formData.name" />
      </ElFormItem>
    </ElForm>
  </ElDialog>
</template>
<style lang="scss" scoped>
:deep() {
  .el-cascader.el-tooltip__trigger {
    flex: 1 auto;
  }
}
</style>
