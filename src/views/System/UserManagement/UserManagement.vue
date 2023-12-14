<script setup lang="ts">
import { useStyleStore } from '@/store';
import UserList from './UserList.vue';
import MobileUserList from './MobileUserList.vue';

const styleStore = useStyleStore();
</script>
<template>
  <UserList v-if="styleStore.deviceMode === 'pc'" />
  <MobileUserList v-else />
</template>
