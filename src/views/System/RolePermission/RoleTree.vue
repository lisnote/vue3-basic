<script setup lang="ts">
import { getRoleTree, type Role } from '@/api/user';
import { ElTree } from 'element-plus';
import { ref } from 'vue';

const emit = defineEmits({
  'node-click': (role: Role) => role,
});

const treeData = ref<Role[]>([]);
getRoleTree().then(({ data: { data } }) => {
  treeData.value = data;
});

function nodeClick(role: Role) {
  emit('node-click', role);
}
</script>

<template>
  <ElScrollbar>
    <ElTree
      :data="treeData"
      :props="{ label: 'name' }"
      default-expand-all
      :expand-on-click-node="false"
      draggable
      @node-click="nodeClick($event)"
    />
  </ElScrollbar>
</template>
