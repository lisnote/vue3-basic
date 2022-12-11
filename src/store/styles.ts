import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
const useStylesStore = defineStore('styles', {
  state: () =>
    useStorage('styles', {
      theme: '',
    }),
});
export default useStylesStore;
