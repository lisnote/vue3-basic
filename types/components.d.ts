declare module 'vue' {
  export interface GlobalComponents {
    ElInput: typeof import('element-plus')['ElInput'];
  }
}
export {};
