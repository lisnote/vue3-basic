import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import router from '@/router';
import { Md5 } from 'ts-md5';
import { login } from '@/api/user';

/**
 * 样式相关信息
 */
export const useUserStore = defineStore('user', {
  state: () => {
    return useStorage('userInfo', {
      id: '',
      name: '',
      phone: '',
      token: '',
      permissionList: [] as string[],
    });
  },
  actions: {
    async login(name: string, password: string) {
      login({ name, password }).then(({ data }) => {
        this.$patch(data.data);
      });
      console.log(name, Md5.hashStr(password));
    },
    async logout() {
      this.$patch({
        id: '',
        name: '',
        phone: '',
        token: '',
        permissionList: [],
      });
      router.push('/login');
    },
  },
});
