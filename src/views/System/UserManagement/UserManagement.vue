<script setup lang="ts">
import commonStyle from '@/styles/common.module.scss';
import { useStyleStore } from '@/store';
import { defineAsyncComponent } from 'vue';
const UserList = defineAsyncComponent(() => import('./UserList.vue'));
const MobileUserList = defineAsyncComponent(
  () => import('./MobileUserList.vue'),
);
const styleStore = useStyleStore();
</script>
<template>
  <div :class="commonStyle.contentArea" class="flex flex-col">
    <component
      :is="styleStore.deviceMode === 'pc' ? UserList : MobileUserList"
    />
  </div>
</template>
