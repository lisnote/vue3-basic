<script lang="ts" setup>
import pkg from '@root/package.json';
import useMainStore from '@/store';
</script>
<template>
  <div v-for="(key, value) in useMainStore().$state" :key="key">
    {{ value }} : {{ key }}
  </div>
  <hr />
  <div v-for="(key, value) in pkg.dependencies" :key="key">
    {{ value }} : {{ key }}
  </div>
  <hr />
  <div v-for="(key, value) in pkg.devDependencies" :key="key">
    {{ value }} : {{ key }}
  </div>
</template>
