<script lang="ts" setup>
import { ref } from 'vue';
const data = ref('');
</script>
<template>
  <ElInput v-model="data" />
  <pre>{{ data }}</pre>
</template>
