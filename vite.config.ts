import { ConfigEnv, UserConfigExport, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss';
import { resolve } from 'path';
import mock from './mock';

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const env = loadEnv(mode, __dirname, '');
  mock(mode, env);
  return {
    base: './',
    plugins: [vue(), WindiCSS()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@root': __dirname,
      },
    },
    envPrefix: 'APP_',
  };
};
