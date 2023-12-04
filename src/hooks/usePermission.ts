import { useUserStore } from '@/store';

const userStore = useUserStore();

export function hasPermission(permission: string | undefined) {
  return permission ? userStore.permissions.includes(permission) : true;
}

export function notPermission(permission: string) {
  return !hasPermission(permission);
}
