import type { App } from 'vue';
import LisMenu from './LisMenu';

const components = {
  LisMenu,
};

/**
 * 全局注册自定义组件系列 LisUI
 */
export default function (app: App) {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
  });
}
