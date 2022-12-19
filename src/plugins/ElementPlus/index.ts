/**
 * Element Plus 组件封装
 */
import type { App } from 'vue';
import { ElInput } from './ElInput';

import 'element-plus/dist/index.css';

const components = { ElInput };

/**
 * 全局注册指定 Element Plus 组件的 vue 插件
 */
export default function (app: App) {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
  });
}
