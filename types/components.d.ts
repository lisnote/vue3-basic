declare module 'vue' {
  export interface GlobalComponents {
    ElInput: typeof import('element-plus')['ElInput'];
    ElScrollbar: typeof import('element-plus')['ElScrollbar'];
  }
}
export {};
