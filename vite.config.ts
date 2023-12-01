import { ConfigEnv, UserConfigExport, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { viteMockServe } from 'vite-plugin-mock';
import svgLoader from 'vite-svg-loader';
import { createHtmlPlugin } from 'vite-plugin-html';
import vueJsx from '@vitejs/plugin-vue-jsx';
import pkg from './package.json';
import yamlLoader from '@modyfi/vite-plugin-yaml';
import UnoCSS from 'unocss/vite';

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
      vueJsx(),
      svgLoader(),
      yamlLoader(),
      viteMockServe({
        mockPath: 'mock',
        watchFiles: true,
        ignore: /index\.ts/,
      }),
      UnoCSS(),
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
