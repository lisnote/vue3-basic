import { defineStore } from 'pinia';

/**
 * 项目主要信息
 */
export const useMainStore = defineStore('main', {
  state: () => ({
    project: 'vue3-basic',
    author: 'lisnote',
    description: 'Start writing the vue3 project from here',
  }),
});
