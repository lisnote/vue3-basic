<script lang="ts" setup>
import useStylesStore from '@/store/styles';
const stylesStore = useStylesStore();
switchTheme(stylesStore.theme);
function switchTheme(theme: string) {
  document.documentElement.dataset.theme = theme;
  stylesStore.theme = theme;
  if (theme) import(`../../styles/theme/${theme}.scss`);
}
</script>

<template>
  <button @click="switchTheme('')">默认主题</button>
  <button @click="switchTheme('green')">绿色主题</button>
  <button @click="switchTheme('dark')">夜间主题</button>
  <button @click="switchTheme('memorial-day')">哀悼日</button>
</template>
