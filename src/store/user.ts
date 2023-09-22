import { defineStore } from 'pinia';
import { useStorage } from '@/utils/storage';
import router from '@/router';
import { Md5 } from 'ts-md5';
import { login, logout } from '@/api/user';
import pinia from './pinia';

/**
 * 样式相关信息
 */
export function useUserStore() {
  return defineStore('user', {
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
        logout({ token: this.token });
        this.$patch({
          id: '',
          name: '',
          phone: '',
          token: '',
          avatar: '',
          permissionList: [],
        });
        router.push('/Login');
      },
    },
  })(pinia);
}
