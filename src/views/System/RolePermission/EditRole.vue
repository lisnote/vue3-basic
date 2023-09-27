<script setup lang="ts">
import { type Role, updateRole, addRole } from '@/api/user';
import { ElDialog } from 'element-plus';
// import { ElDialog } from 'element-plus';

const props = withDefaults(
  defineProps<{
    visible: boolean;
    data: Role;
    mode: 'add' | 'edit';
  }>(),
  { data: () => ({ id: '', name: '' }) },
);
const emit = defineEmits(['success', 'update:visible']);
</script>

<template>
  <ElDialog
    :title="mode === 'add' ? '新增职位' : '编辑职位'"
    :model-value="visible"
    @update:model-value="emit('update:visible', $event)"
  >
    <div v-for="(value, key) of props" :key="key">{{ key }} : {{ value }}</div>
  </ElDialog>
</template>
