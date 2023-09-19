import {
  useStorage as StorageLocal,
  useSessionStorage as StorageSession,
} from '@vueuse/core';
import pkg from '@root/package.json';
import type {
  MaybeComputedRef,
  RemovableRef,
  StorageLike,
  UseStorageOptions,
} from '@vueuse/core';

/**
 * 封装 \@vueuse/core 的 useStorage
 * 1. 增加前缀, 避免多个项目相同域名时发生冲突
 * 2. 在版本更新时初始化 Storage
 */
export const useStorage: typeof StorageLocal = function <T>(
  key: string,
  defaults: MaybeComputedRef<T>,
  storage?: StorageLike,
  options?: UseStorageOptions<T>,
): RemovableRef<T> {
  key = pkg.name + '-' + key;
  removeItemOnUpdate(key, 'local');
  return StorageLocal(key, defaults, storage, options);
};

/**
 * 封装 \@vueuse/core 的 useSessionStorage
 * 1. 增加前缀, 避免多个项目相同域名时发生冲突
 * 2. 在版本更新时初始化 Storage
 */
export const useSessionStorage: typeof StorageSession = function <T>(
  key: string,
  initialValue: MaybeComputedRef<T>,
  options?: UseStorageOptions<T>,
): RemovableRef<T> {
  removeItemOnUpdate(key, 'session');
  return StorageSession(key, initialValue, options);
};

/**
 * 版本更新时初始化Storage
 * @param key storage key
 * @param storage 操作的 storage
 */
function removeItemOnUpdate(key: string, type: 'local' | 'session' = 'local') {
  const storage = type == 'local' ? localStorage : sessionStorage;
  const storageVersionKey = pkg.name + '-storage-version';
  const storageVersion = JSON.parse(storage.getItem(storageVersionKey) || '{}');
  if (storageVersion[key] != pkg.version) {
    storage.removeItem(key);
    storageVersion[key] = pkg.version;
    storage.setItem(storageVersionKey, JSON.stringify(storageVersion));
  }
}
