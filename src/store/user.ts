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
      phone: '',
      token: '',
      avatar: '',
      permissionList: [] as string[],
    });
  },
  actions: {
    async login(phone: string, password: string) {
      await login({ phone, password: Md5.hashStr(password) }).then(
        ({ data }) => {
          this.$patch(data.data);
        },
      );
    },
    async logout() {
      this.$patch({
        id: '',
        name: '',
        phone: '',
        token: '',
        avatar: '',
        permissionList: [],
      });
      logout({ token: this.token });
      router.push('/Login');
    },
  },
});
