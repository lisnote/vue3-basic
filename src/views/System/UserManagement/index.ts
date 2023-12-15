import UserManagement from './UserManagement.vue';
export default UserManagement;
import { User, removeUsers } from '@/apis/user';
import { ElMessage, ElMessageBox } from 'element-plus';
import { t } from '@/locales';
import { useUserStore } from '@/store';

const userStore = useUserStore();
export function useRemoveUsers(successCb: CallableFunction) {
  return async (users: User[]) => {
    ElMessageBox.confirm(
      t('button.deleteConfirm', [
        users
          .slice(0, 3)
          .map(({ name }) => name)
          .join(', ') + (users.length > 3 ? '...' : ''),
      ]),
      {
        type: 'warning',
        title: t('button.delete'),
        confirmButtonText: t('button.confirm'),
      },
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
