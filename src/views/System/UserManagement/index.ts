export { default } from './UserManagement.vue';
import { User, removeUsers } from '@/apis/user';
import { ElMessage } from '@/components/ElementPlus';
import { WarningBox } from '@/components/MessageBox';
import { t } from '@/locales';
import { useUserStore } from '@/store';

const userStore = useUserStore();
export function useRemoveUsers(successCb: CallableFunction) {
  return async (users: User[]) => {
    WarningBox(
      t('button.deleteConfirm', [
        users
          .slice(0, 3)
          .map(({ name }) => name)
          .join(', ') + (users.length > 3 ? '...' : ''),
      ]),
    )
      .then(() => removeUsers(users.map(({ id }) => id)))
      .then(() => {
        ElMessage.success(t('views.userManagement.userDeleteSuccessfully'));
        successCb();
      });
  };
}
export function useLogin(successCb?: CallableFunction) {
  return async (user: User) => {
    await userStore.login(user.phone, 'admin123');
    successCb?.();
  };
}
