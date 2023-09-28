<script setup lang="ts">
import { type Role, updateRole, addRole } from '@/api/user';
import { ElCascader, ElDialog } from 'element-plus';
import { ref } from 'vue';

const props = withDefaults(
  defineProps<{
    visible: boolean;
    data: Role & { pid?: string };
    mode: 'add' | 'edit';
    roleTree: Role[];
  }>(),
  { data: () => ({ id: '', name: '' }) },
);
const emit = defineEmits(['success', 'update:visible']);

const formData = ref({ pid: '', id: '', name: '' });
function loadData() {
  if (props.mode === 'add') {
    formData.value.pid = props.data.id;
  } else {
    formData.value.name = props.data.name;
    formData.value.id = props.data.id;
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
          :props="{ label: 'name', checkStrictly: true, emitPath: false }"
          clearable
          :show-all-levels="false"
        />
      </ElFormItem>
      <ElFormItem label="名称">
        <ElInput v-model="formData.name" />
      </ElFormItem>
    </ElForm>
    <div v-for="(value, key) of props" :key="key">{{ key }} : {{ value }}</div>
  </ElDialog>
</template>
