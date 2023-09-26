import { useStyleStore } from '@/store';
import { watch, type WatchCallback } from 'vue';
import { type Theme } from '@/utils/theme';

const sytleStore = useStyleStore();

export function useWatchTheme(fn: WatchCallback<Theme, Theme>) {
  watch(() => sytleStore.theme, fn);
}

export function useWatchIsDarkTheme(fn: WatchCallback<boolean, boolean>) {
  watch(() => sytleStore.theme === 'dark', fn);
}
