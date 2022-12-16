<script lang="ts" setup>
import switchTheme from '@/utils/theme';
import { useStylesStore } from '@/store';
const stylesStore = useStylesStore();
switchTheme(stylesStore.theme);
</script>

<template>
  <button @click="switchTheme('')">默认主题</button>
  <button @click="switchTheme('green')">绿色主题</button>
  <button @click="switchTheme('dark')">夜间主题</button>
  <button @click="switchTheme('memorial-day')">哀悼日</button>
</template>
