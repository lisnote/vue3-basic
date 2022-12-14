import LisMenu from '../src/components/LisUI/LisMenu';
declare module 'vue' {
  export interface GlobalComponents {
    LisMenu: typeof LisMenu;
    ElInput: typeof import('element-plus')['ElInput'];
  }
}
