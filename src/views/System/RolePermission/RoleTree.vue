<script setup lang="ts">
import { getRoleTree } from '@/api/user';
import { ElTree } from 'element-plus';
import { ref } from 'vue';

const emit = defineEmits<{ (e: 'node-click', id: string): void }>();

const treeData = ref([]);
getRoleTree().then(({ data: { data } }) => {
  treeData.value = data;
});

function nodeClick({ id }: { id: string }) {
  emit('node-click', id);
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
