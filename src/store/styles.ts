import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useStylesStore = defineStore('styles', {
  state: () =>
    useStorage('styles', {
      theme: '',
    }),
});
