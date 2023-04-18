// import RecursiveMenu from '../src/components/RecursiveMenu';
declare module 'vue' {
  export interface GlobalComponents {
    // RecursiveMenu: typeof RecursiveMenu;
    ElInput: typeof import('element-plus')['ElInput'];
  }
}
export {};
