import { ref, watch } from 'vue';
import { useStorage } from '@/utils/storage';

/** 支持的语言Map */
export const langs = {
  'zh-CN': '简体中文',
  en: 'English',
};
/** 当前的语言 */
export const lang = useStorage(
  'lang',
  navigator.language in langs ? navigator.language : 'en',
);
/** 获取所有语言库加载函数 */
const langModules = Object.fromEntries(
  Object.entries(import.meta.glob('./*.yaml', { import: 'default' })).map(
    ([key, value]: [string, any]) => [
      key.replace(/^\.\/(.*)\.yaml/, '$1'),
      value,
    ],
  ),
);
/** 当前语言库 */
const messages = ref();
watch(
  lang,
  async (newLang) => {
    const msg = await langModules[newLang]();
    if (lang.value === newLang) messages.value = msg;
  },
  { immediate: true },
);

/** 此函数并无数据处理, 仅用于配合 i18n Ally 插件进行智能提示 */
export const $t = (message: string) => message;

/**
 * 响应式国际化函数
 * @param message 待国际化的信息
 * @returns 国际化后的信息
 */
export function t(
  message: string,
  map?: Record<string, string | number> | Array<string | number>,
) {
  let msg = message
    .split('.')
    .reduce((pre, current) => pre?.[current] || message, messages.value);
  if (map) {
    Object.entries(map).forEach(([key, value]) => {
      msg = msg.replaceAll('%{' + key + '}', String(value));
    });
  }
  return msg;
}
