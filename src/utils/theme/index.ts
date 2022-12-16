import pinia, { useStylesStore } from '@/store';

const stylesStore = useStylesStore(pinia);

export default function switchTheme(theme: string) {
  document.documentElement.dataset.theme = theme;
  stylesStore.theme = theme;
  if (theme) import(`../../styles/theme/${theme}.scss`);
}
