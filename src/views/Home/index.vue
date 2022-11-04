<script lang="ts" setup>
import pkg from '@root/package.json';
</script>
<template>
  <h2>一个基本的 Vue3 项目</h2>
  <hr />
  <div v-for="(key, value) in pkg.dependencies" :key="key">
    {{ value }} : {{ key }}
  </div>
  <hr />
  <div v-for="(key, value) in pkg.devDependencies" :key="key">
    {{ value }} : {{ key }}
  </div>
</template>
