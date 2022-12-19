import { switchTheme } from '@/utils/theme';
import { App } from 'vue';

export default function init(app: App) {
  switchTheme();
}
