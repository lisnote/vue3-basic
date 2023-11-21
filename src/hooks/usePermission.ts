import { useUserStore } from '@/store';

const userStore = useUserStore();

export function hasPermission(permission: string) {
  userStore.permissions?.ha;
}
