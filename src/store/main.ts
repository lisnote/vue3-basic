import { defineStore } from 'pinia';
import pinia from '.';
import pkg from '@root/package.json';

/**
 * 项目主要信息
 */
export function useMainStore() {
  return defineStore('main', {
    state: () => ({
      projectName: pkg.name,
      author: pkg.author.name,
      description: pkg.description,
    }),
  })(pinia);
}
