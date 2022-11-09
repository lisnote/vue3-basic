import { ConfigEnv, UserConfigExport, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import startMocker from './mock';

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const { VITE_BACKEND, VITE_PORT, VITE_MOCK_PROXY } = loadEnv(mode, __dirname);
  if (mode === 'mock') startMocker(VITE_PORT, VITE_MOCK_PROXY);
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@root': __dirname,
      },
    },
    server: {
      proxy: {
        '/api': {
          target: VITE_BACKEND + ':' + VITE_PORT,
          changeOrigin: true,
          rewrite: (path) => path.replace(/\/api/, ''),
        },
      },
    },
  };
};
