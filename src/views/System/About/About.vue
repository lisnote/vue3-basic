<script lang="ts" setup>
import pkg from '@root/package.json';
import http from '@/utils/http';
import { ref } from 'vue';
import { dateFormat } from '@/utils/date';

import type { Ref } from 'vue';

const projectInfo = {
  name: pkg.name,
  author: pkg.author.name,
  description: pkg.description,
};
const data: Ref<Record<string, string>> = ref({});
http
  .get('https://api.github.com/repos/lisnote/vue3-basic')
  .then(
    ({
      data: { stargazers_count: stargazersCount, updated_at: updatedAt },
    }) => {
      data.value = {
        stargazersCount,
        updatedAt: dateFormat(updatedAt),
      };
    },
  );
</script>
<template>
  <div>
    <div v-for="(key, value) in projectInfo" :key="key">
      {{ value }} : {{ key }}
    </div>
    <div v-for="(key, value) in data" :key="key">{{ value }} : {{ key }}</div>
    <hr />
    <div v-for="(key, value) in pkg.dependencies" :key="key">
      {{ value }} : {{ key }}
    </div>
    <hr />
    <div v-for="(key, value) in pkg.devDependencies" :key="key">
      {{ value }} : {{ key }}
    </div>
  </div>
</template>
