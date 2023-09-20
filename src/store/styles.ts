import { defineStore } from 'pinia';
import { useStorage } from '@/utils/storage';
import pinia from './pinia';
import { type Theme } from '@/utils/theme';

/**
 * 样式相关信息
 */
export function useStylesStore() {
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
      hideSidebar() {
        this.sidebarVisible = false;
      },
    },
  })(pinia);
}
