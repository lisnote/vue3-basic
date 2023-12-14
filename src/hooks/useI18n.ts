import { lang, messages } from '@/locales';
import { watch, WatchCallback } from 'vue';

export function useWatchLang(
  fn: WatchCallback<string>,
  options?: Parameters<typeof watch>[2],
) {
  return watch(lang, fn, options);
}

export function useWatchMessage(
  fn: (newLang: string) => void,
  options?: Parameters<typeof watch>[2],
) {
  return watch(messages, () => fn(lang.value), options);
}
