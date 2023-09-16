import { defineStore } from 'pinia';

/**
 * 项目主要信息
 */
export const useMainStore = defineStore('main', {
  state: () => ({
    projectName: import.meta.env.APP_PROJECT_NAME,
    author: 'lisnote',
    description: 'Vue3 projects example',
  }),
});
