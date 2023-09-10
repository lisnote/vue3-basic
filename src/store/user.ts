import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import router from '@/router';
import { Md5 } from 'ts-md5';
import { login, logout } from '@/api/user';

/**
 * 样式相关信息
 */
export const useUserStore = defineStore('user', {
  state: () => {
    return useStorage('userInfo', {
      id: '',
      name: '',
      token: '',
      avatar: '',
      permissionList: [] as string[],
    });
  },
  actions: {
    async login(name: string, password: string) {
      await login({ name, password: Md5.hashStr(password) }).then(
        ({ data }) => {
          this.$patch(data.data);
        },
      );
    },
    async logout() {
      this.$patch({
        id: '',
        name: '',
        token: '',
        avatar: '',
        permissionList: [],
      });
      logout({ token: this.token });
      router.push('/Login');
    },
  },
});
