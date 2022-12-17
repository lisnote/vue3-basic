import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';

/**
 * 样式相关信息
 */
export const useStylesStore = defineStore('styles', {
  state: () =>
    useStorage('styles', {
      theme: '',
    }),
});
