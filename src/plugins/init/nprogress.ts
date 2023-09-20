import nProgress from 'nprogress';
import '@/styles/nprogress.scss';

export function configureNProgress() {
  nProgress.configure({
    showSpinner: false,
  });
}
