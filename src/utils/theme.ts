// 主题相关函数, 变量, 类型
import pinia, { useStylesStore } from '@/store';

export const themeMap = {
  '': { name: '默认主题', background: 'white', color: '#409eff' },
  dark: { name: '夜间模式', background: 'black', color: 'white' },
  green: { name: '绿色主题', background: 'white', color: 'lime' },
  'memorial-day': { name: '哀悼日', background: 'white', color: '#919191' },
};
export type Theme = keyof typeof themeMap | undefined;
/**
 * 切换主题, 不传参即为初始化
 * @param {Theme} theme 主题名称
 */
export function switchTheme(theme?: Theme) {
  const stylesStore = useStylesStore(pinia);
  if (theme === undefined) {
    theme = stylesStore.theme;
  } else {
    stylesStore.theme = theme;
  }
  document.documentElement.dataset.theme = theme;
  if (theme) import(`../styles/theme/${theme}.scss`);
}
