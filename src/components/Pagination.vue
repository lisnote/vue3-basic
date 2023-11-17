<script setup lang="ts">
import { ElPagination } from 'element-plus';
const emit = defineEmits(['change', 'update:page', 'update:limit']);
const props = defineProps({
  page: {
    type: Number,
    default: () => 1,
  },
  limit: {
    type: Number,
    default: () => 10,
  },
  total: {
    type: Number,
    required: true,
  },
});
let page = 1;
let limit = 10;
function updatePage(value: number) {
  page = value;
  emit('update:page', value);
  emit('change', page, limit);
}
function updateLimit(value: number) {
  limit = value;
  emit('update:limit', value);
  emit('change', page, limit);
}
</script>

<template>
  <ElPagination
    :bind="$attrs"
    :total="props.total"
    :current-page="props.page"
    :page-size="props.limit"
    layout="slot, ->, sizes, prev, next, jumper"
    background
    @update:current-page="updatePage"
    @update:page-size="updateLimit"
  >
    <template #default>
      <div>
        共 {{ props.total }} 条，{{ Math.ceil(props.total / props.limit) }} 页
      </div>
    </template>
  </ElPagination>
</template>
