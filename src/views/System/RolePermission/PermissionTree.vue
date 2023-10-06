<script setup lang="ts">
import { type Role, getRolePermission } from '@/api/user';
import { watch } from 'vue';

const props = defineProps<{
  role: Role | undefined;
}>();

watch(
  () => props.role,
  () => {
    if (!props.role?.id) return;
    getRolePermission({ id: props.role.id }).then(({ data }) => {
      console.log(data);
    });
  },
);
</script>

<template>
  <div>{{ props.role }}</div>
</template>
