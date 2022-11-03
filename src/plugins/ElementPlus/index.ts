import type { App } from 'vue';
import { ElInput } from 'element-plus';
import 'element-plus/dist/index.css';

const components = { ElInput };

export default function (app: App) {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
  });
}
