import { lang } from '@/locales';
import { type WatchCallback, watch } from 'vue';
export function useWatchLang(fn: WatchCallback<string, string>) {
  watch(lang, fn);
}
