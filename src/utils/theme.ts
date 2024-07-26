// 主题相关函数, 变量, 类型
import { useStyleStore } from '@/store';
import { $t } from '@/locales';
import nProgress from 'nprogress';
// 主题映射
export const themeMap = {
  default: {
    name: $t('theme.default'),
    accentColor: '#409eff',
    background: '#FFFFFF',
    color: '#409eff',
  },
  dark: {
    name: $t('theme.dark'),
    accentColor: '#000000',
    background: '#000000',
    color: '#FFFFFF',
  },
  green: {
    name: $t('theme.green'),
    accentColor: '#00FF00',
    background: '#FFFFFF',
    color: '#00FF00',
  },
};
export type Theme = keyof typeof themeMap;
/**
 * 切换主题, 不传参即为初始化
 * @param theme 主题名称
 */
export function switchTheme(theme?: Theme) {
  const styleStore = useStyleStore();
  if (theme === undefined) {
    theme = styleStore.theme;
  } else {
    styleStore.theme = theme;
  }
  document.documentElement.dataset.theme = theme;
  if (theme !== 'default') {
    nProgress.start();
    import(`@/styles/theme/${theme}.scss`).then(nProgress.done);
  }
}
