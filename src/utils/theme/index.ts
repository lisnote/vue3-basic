/**
 * 主题相关函数
 */
import pinia, { useStylesStore } from '@/store';

const stylesStore = useStylesStore(pinia);

/**
 * 切换主题, 不传参即为初始化
 * @param {string} theme 主题名称
 */
export function switchTheme(theme: string = '') {
  document.documentElement.dataset.theme = theme;
  stylesStore.theme = theme;
  if (theme) import(`../../styles/theme/${theme}.scss`);
}
