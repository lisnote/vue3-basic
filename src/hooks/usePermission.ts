import { useUserStore } from '@/store';

const userStore = useUserStore();

export function hasPermission(permission: string) {
  return userStore.permissions.includes(permission);
}

export function notPermission(permission: string) {
  return !hasPermission(permission);
}
