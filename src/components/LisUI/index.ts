import type { App } from 'vue';
import LisMenu from './LisMenu';

const components = {
  LisMenu,
};

export default function (app: App) {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component);
  });
}
