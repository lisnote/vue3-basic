import {
  ElMessageBox,
  type ElMessageBoxOptions,
} from '@/components/ElementPlus';

export function WarningBox(message: ElMessageBoxOptions['message']) {
  return ElMessageBox({
    message,
    type: 'warning',
    title: '警告',
    showCancelButton: true,
  });
}
