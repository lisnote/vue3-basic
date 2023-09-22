<script setup lang="ts">
import commonStyle from '@/styles/common.module.scss';
import CountUp from 'vue-countup-v3';
</script>

<template>
  <div :class="commonStyle.contentArea">
    <CountUp
      :end-val="9432.123"
      :start-val="4532.4521"
      :options="{
        decimalPlaces: 2,
        duration: 0.5,
      }"
      class="text-3xl"
    />
  </div>
</template>
