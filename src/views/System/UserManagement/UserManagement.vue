<script setup lang="ts">
import { useStyleStore } from '@/store';
import { defineAsyncComponent } from 'vue';
const UserList = defineAsyncComponent(() => import('./UserList.vue'));
const MobileUserList = defineAsyncComponent(
  () => import('./MobileUserList.vue'),
);
const styleStore = useStyleStore();
</script>
<template>
  <div class="h-full">
    <component
      :is="styleStore.deviceMode === 'pc' ? UserList : MobileUserList"
    />
  </div>
</template>
