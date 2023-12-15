import { defineStore } from 'pinia';
import { useStorage } from '@/utils/storage';
import router from '@/router';
import { Md5 } from 'ts-md5';
import { login, logout } from '@/apis/user';
import { ElMessage } from '@/components/ElementPlus';
import { t } from '@/locales';
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
        avatar: '',
        phone: '',
        email: '',
        role: '',
        roleId: '',
        token: '',
        permissions: [] as string[],
      });
    },
    actions: {
      async login(phone: string, password: string) {
        await login({ phone, password: Md5.hashStr(password) }).then(
          ({ data }) => {
            this.$patch(data.data);
            ElMessage.success(t('views.login.signInSuccessfully'));
          },
        );
      },
      async logout() {
        logout().finally(() => {
          this.$patch({
            id: '',
            name: '',
            avatar: '',
            phone: '',
            email: '',
            role: '',
            roleId: '',
            token: '',
            permissions: [] as string[],
          });
          router.push('/Login');
        });
      },
    },
  })(pinia);
}
