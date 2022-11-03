<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
function push(path: string) {
  router.push(path);
}
</script>

<template>
  <button @click="push('/')">Home</button>
  <button @click="push('about')">About</button>
  <RouterView />
</template>

<style scoped></style>
