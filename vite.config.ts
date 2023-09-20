import { ConfigEnv, UserConfigExport, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss';
import { resolve } from 'path';
import { viteMockServe } from 'vite-plugin-mock';
import svgLoader from 'vite-svg-loader';
import { createHtmlPlugin } from 'vite-plugin-html';
import pkg from './package.json';

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfigExport => {
  const env = loadEnv(mode, __dirname, '');
  return {
    base: './',
    plugins: [
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: pkg.name,
          },
        },
      }),
      vue(),
      WindiCSS(),
      viteMockServe({
        mockPath: 'mock',
        watchFiles: true,
        ignore: /index\.ts/,
      }),
      svgLoader(),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@root': __dirname,
      },
    },
    envPrefix: 'APP_',
    server: {
      port: Number(env.APP_PORT),
    },
    build: {
      target: 'ESNext',
      chunkSizeWarningLimit: 2000,
    },
  };
};
