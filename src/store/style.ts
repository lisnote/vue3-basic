import { defineStore } from 'pinia';
import { useStorage } from '@/utils/storage';
import pinia from './pinia';
import { type Theme } from '@/utils/theme';

/**
 * 样式相关信息
 */
export function useStyleStore() {
  return defineStore('styles', {
    state: () =>
      useStorage('styles', {
        theme: 'default' as Theme,
        deviceMode: 'mobile' as 'mobild' | 'pc',
        isTouchDevice: 'ontouchstart' in document.documentElement,
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

const styleStore = useStyleStore();
styleStore.$patch({
  deviceMode: window.innerWidth < 768 ? 'mobild' : 'pc',
  sidebarVisible: false,
  isTouchDevice: 'ontouchstart' in document.documentElement,
});
window.addEventListener('resize', () => {
  if (window.innerWidth < 768) {
    styleStore.deviceMode = 'mobild';
  } else {
    styleStore.deviceMode = 'pc';
    styleStore.sidebarVisible = false;
  }
});
