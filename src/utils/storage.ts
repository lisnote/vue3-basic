import {
  useStorage as StorageLocal,
  useSessionStorage as StorageSession,
} from '@vueuse/core';
import type {
  MaybeComputedRef,
  RemovableRef,
  StorageLike,
  UseStorageOptions,
} from '@vueuse/core';

export const useStorage: typeof StorageLocal = function <T>(
  key: string,
  defaults: MaybeComputedRef<T>,
  storage?: StorageLike,
  options?: UseStorageOptions<T>,
): RemovableRef<T> {
  return StorageLocal(key, defaults, storage, options);
};

export const useSessionStorage: typeof StorageSession = function <T>(
  key: string,
  initialValue: MaybeComputedRef<T>,
  options?: UseStorageOptions<T>,
): RemovableRef<T> {
  return StorageSession(key, initialValue, options);
};
