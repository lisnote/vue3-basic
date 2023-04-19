import { ConfigEnv, UserConfigExport, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const { VITE_PORT } = loadEnv(mode, __dirname);
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@root': __dirname,
      },
    },
    server: {
      port: Number(VITE_PORT),
    },
  };
};
