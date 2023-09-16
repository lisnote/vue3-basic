import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import pinia from '.';
import { type Theme } from '@/utils/theme';

/**
 * 样式相关信息
 */
export const useStylesStore = function () {
  return defineStore('styles', {
    state: () =>
      useStorage('styles', {
        theme: 'default' as Theme,
        sidebarVisible: false,
      }),
    actions: {
      sidebarToggle() {
        this.sidebarVisible = !this.sidebarVisible;
      },
    },
  })(pinia);
};
