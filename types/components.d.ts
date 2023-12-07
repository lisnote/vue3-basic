declare module 'vue' {
  export interface GlobalComponents {
    ElInput: (typeof import('element-plus'))['ElInput'];
    ElScrollbar: (typeof import('element-plus'))['ElScrollbar'];
    ElLink: (typeof import('element-plus'))['ElLink'];
    ElForm: (typeof import('element-plus'))['ElForm'];
    ElFormItem: (typeof import('element-plus'))['ElFormItem'];
  }
}
export {};
