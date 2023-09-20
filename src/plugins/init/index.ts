import { switchTheme } from '@/utils/theme';
import { installVConsole } from './vConsole';
import { configureNProgress } from './nprogress';
function init() {
  switchTheme();
  installVConsole();
  configureNProgress();
}
init();
