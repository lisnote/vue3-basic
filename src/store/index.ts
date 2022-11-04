import { defineStore } from 'pinia';
const useMainStore = defineStore('main', {
  state: () => ({
    project: 'vue3-basic',
    author: 'lisnote',
    description: 'Start writing the vue3 project from here',
  }),
});
export default useMainStore;
