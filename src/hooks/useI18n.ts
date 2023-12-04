import { lang } from '@/locales';
import { watch, WatchCallback } from 'vue';
export function useWatchLang(
  fn: WatchCallback<string>,
  options?: Parameters<typeof watch>[2],
) {
  watch(lang, fn, options);
}
