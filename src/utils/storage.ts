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

const prefix = pkg.name + '-';
// 版本更新时重置 Storage
const version = StorageLocal<string>(prefix + 'version', pkg.version);
if (version.value !== pkg.version) {
  [localStorage, sessionStorage].forEach((storage) => {
    Object.keys(localStorage).forEach((key) => {
      if (key.indexOf(prefix) === 0) {
        storage.removeItem(key);
      }
    });
  });
  version.value = pkg.version;
}

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
  return StorageLocal(prefix + key, defaults, storage, options);
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
  return StorageSession(prefix + key, initialValue, options);
};
