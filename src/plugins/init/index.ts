import { switchTheme } from '@/utils/theme';
import { installVConsole } from './vConsole';
function init() {
  switchTheme();
  installVConsole();
}
init();
