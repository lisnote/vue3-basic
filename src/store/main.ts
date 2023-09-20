import { defineStore } from 'pinia';
import pinia from '.';

/**
 * 项目主要信息
 */
export function useMainStore() {
  return defineStore('main', {
    state: () => ({
      projectName: import.meta.env.APP_PROJECT_NAME,
      author: 'lisnote',
      description: 'Vue3 projects example',
    }),
  })(pinia);
}
