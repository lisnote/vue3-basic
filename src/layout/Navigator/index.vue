<script setup lang="ts">
import { useMainStore } from '@/store';
import { Edit } from '@element-plus/icons-vue';
const mainStore = useMainStore();
</script>
<template>
  <nav class="navigator">
    <div class="project-name">{{ mainStore.projectName.toUpperCase() }}</div>
    <Edit class="w-1" />
  </nav>
</template>
<style scoped lang="scss">
.navigator {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .project-name {
    font-size: xx-large;
    margin: 0 10px;
  }
}
</style>
