<script lang="ts" setup>
function switchTheme(theme: string) {
  document.documentElement.dataset.theme = theme;
  if (theme) import(`../../styles/theme/${theme}.scss`);
}
</script>

<template>
  <button @click="switchTheme('')">默认主题</button>
  <button @click="switchTheme('green')">绿色主题</button>
  <button @click="switchTheme('dark')">夜间主题</button>
  <button @click="switchTheme('memorial-day')">哀悼日</button>
</template>
