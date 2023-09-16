import { switchTheme } from '@/utils/theme';
import { installVConsole } from './vConsole';
import { clearStore } from './clearStore';
function init() {
  clearStore();
  switchTheme();
  installVConsole();
}
init();
