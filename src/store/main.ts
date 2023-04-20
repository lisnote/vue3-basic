import { defineStore } from 'pinia';

/**
 * 项目主要信息
 */
export const useMainStore = defineStore('main', {
  state: () => ({
    projectName: 'vue3-basic',
    author: 'lisnote',
    description:
      'This project can be used as a base framework for starting Vue3 projects.',
  }),
});
