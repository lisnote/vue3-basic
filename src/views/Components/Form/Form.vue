<script lang="ts" setup>
import { nextTick, ref } from 'vue';
const data = ref('');

function submit(event: KeyboardEvent) {
  (event.target as HTMLInputElement).blur();
  nextTick(() => console.log(data.value));
}
</script>
<template>
  <div>
    <ElInput
      v-model="data"
      type="textarea"
      placeholder="submit: ctrl+enter"
      @keyup.ctrl.enter="submit"
    />
    <div>
      <pre>{{ data }}</pre>
    </div>
  </div>
</template>
<style lang="scss" scoped>
pre {
  background-color: whitesmoke;
  display: inline;
}
</style>
