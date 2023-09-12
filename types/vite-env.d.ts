/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<
    Record<string, unknown>,
    Record<string, unknown>,
    unknown
  >;
  export default component;
}

interface ImportMetaEnv {
  [key: string]: string;
  APP_API: string;
}

interface Window {
  TMap: any;
  _AMapSecurityConfig: any;
}
