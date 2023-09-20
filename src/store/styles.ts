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
        deviceMode: 'mobile' as 'mobild' | 'pc',
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

const stylesStore = useStylesStore();
stylesStore.deviceMode = window.innerWidth < 768 ? 'mobild' : 'pc';
window.addEventListener('resize', () => {
  stylesStore.deviceMode = window.innerWidth < 768 ? 'mobild' : 'pc';
});
