import type { RouteRecordRaw } from 'vue-router';
import { h } from 'vue';
function createRender(content: string) {
  return () => h('div', content);
}
/**
 * 菜单路由信息
 */
export const menuRoutes: RouteRecordRaw[] = [
  {
    path: '/Dashboard',
    meta: { title: '首页', icon: 'ep:house' },
    component: () => import('@/views/Dashboard'),
  },
  {
    path: '/Components',
    meta: { title: '组件', icon: 'ep:menu' },
    children: [
      {
        path: '/Components/Dialog',
        meta: { title: '对话框' },
        component: () => import('@/views/Components/Dialog.vue'),
      },
      {
        path: '/Components/Form',
        meta: { title: '表单' },
        component: () => import('@/views/Components/Form.vue'),
      },
      {
        path: '/Components/Table',
        meta: { title: '表格(未完成)' },
        component: { render: createRender('表格') },
      },
      {
        path: '/Components/CountJS',
        meta: { title: '数字动画' },
        component: () => import('@/views/Components/CountUp.vue'),
      },
      {
        path: '/Components/CodeViewer',
        meta: { title: '代码查看' },
        component: () => import('@/views/Components/CodeViewer.vue'),
      },
    ],
  },
  {
    path: '/Features',
    meta: { title: '功能', icon: 'ep:magic-stick' },
    children: [
      {
        path: '/Features/SwitchTheme',
        meta: { title: '切换主题' },
        component: () => import('@/views/Features/SwitchTheme'),
      },
      {
        path: '/Features/FileDownload',
        meta: { title: '文件下载' },
        component: () => import('@/views/Features/FileDownload'),
      },
      {
        path: '/Features/MarkdownRender',
        meta: { title: 'Markdown渲染' },
        component: () => import('@/views/Features/MarkdownRender'),
      },
      {
        path: '/Features/CodeEditor',
        meta: { title: '代码编辑' },
        component: () => import('@/views/Features/CodeEditor'),
      },
      {
        path: '/Features/PDFRender',
        meta: { title: 'PDF渲染' },
        component: () => import('@/views/Features/PDFRender'),
      },
      {
        path: '/Features/RichTextEditor',
        meta: { title: '富文本编辑' },
        component: () => import('@/views/Features/RichTextEditor'),
      },
      {
        path: '/Features/VideoPlayer',
        meta: { title: '视频播放' },
        component: () => import('@/views/Features/VideoPlayer'),
      },
      {
        path: '/Features/ScanningCode',
        meta: { title: '扫码' },
        component: () => import('@/views/Features/ScanningCode'),
      },
      {
        path: '/Features/Watermark',
        meta: { title: '网页水印' },
        component: () => import('@/views/Features/Watermark'),
      },
      {
        path: '/Features/AMap',
        meta: { title: '高德地图' },
        component: () => import('@/views/Features/AMap'),
      },
      {
        path: '/Features/TencentMap',
        meta: { title: '腾讯地图' },
        component: () => import('@/views/Features/TencentMap'),
      },
      {
        path: '/Features/WebGL',
        meta: { title: '数字孪生' },
        component: () => import('@/views/Features/WebGL'),
      },
    ],
  },
  {
    path: '/Error',
    meta: { title: '异常页面', icon: 'ep:warning' },
    children: [
      {
        path: '/Error/403',
        meta: { title: '403' },
        component: () => import('@/views/Error/403.vue'),
      },
      {
        path: '/Error/404',
        meta: { title: '404' },
        component: () => import('@/views/Error/404.vue'),
      },
      {
        path: '/Error/500',
        meta: { title: '500' },
        component: () => import('@/views/Error/500.vue'),
      },
    ],
  },
  {
    path: '/Toys',
    meta: { title: '玩具功能', icon: 'ep:sugar' },
    children: [
      {
        path: '/Toys/Game',
        meta: { title: '游戏' },
        children: [
          {
            path: '/Toys/Game/DontTapTheWhiteTile',
            meta: { title: '别踩白块(未完成)' },
            component: { render: createRender('别踩白块') },
          },
          {
            path: '/Toys/Game/ControlThe3DCar',
            meta: { title: '3D遥控车(未完成)' },
            component: { render: createRender('3D遥控车') },
          },
          {
            path: '/Toys/Game/Minecraft',
            meta: { title: '我的世界(未完成)' },
            component: () => import('@/views/Toys/Game/Minecraft'),
          },
        ],
      },
      {
        path: '/Toys/Service',
        meta: { title: '服务' },
        children: [
          {
            path: '/Toys/Service/Websocket',
            meta: { title: '双向通信(未完成)' },
            component: { render: createRender('双向通信SocketIO') },
          },
          {
            path: '/Toys/Service/GraphQL',
            meta: { title: '接口合并(未完成)' },
            component: { render: createRender('接口合并GraphQL') },
          },
          {
            path: '/Toys/Service/WebRTC',
            meta: { title: '即时通信(未完成)' },
            component: { render: createRender('即时通信WebRTC') },
          },
          {
            path: '/Toys/Service/SyncronousVideo',
            meta: { title: '同步放映室(未完成)' },
            component: { render: createRender('同步放映室') },
          },
          {
            path: '/Toys/Service/LiveBroadcast',
            meta: { title: '直播间(未完成)' },
            component: { render: createRender('直播间') },
          },
          {
            path: '/Toys/Service/FileUpload',
            meta: { title: '文件上传(未完成)' },
            component: { render: createRender('文件上传') },
          },
          {
            path: '/Toys/Service/TextToSpeech',
            meta: { title: '文本转语音(未完成)' },
            component: { render: createRender('文本转语音Vits') },
          },
          {
            path: '/Toys/Service/TextToImage',
            meta: { title: 'AI生图(未完成)' },
            component: { render: createRender('AI生图StableDiffusion') },
          },
          {
            path: '/Toys/Service/SuperResolution',
            meta: { title: '图片高清修复(未完成)' },
            component: { render: createRender('图片高清修复Real-ESRGAN') },
          },
        ],
      },
    ],
  },
  {
    path: '/System',
    meta: { title: '系统管理', icon: 'ep:setting' },
    children: [
      {
        path: '/System/RolePermission',
        meta: { title: '职位与权限' },
        component: () => import('@/views/System/RolePermission'),
      },
      {
        path: '/System/UserManagement',
        meta: { title: '用户管理' },
        component: () => import('@/views/System/UserManagement'),
      },
      {
        path: '/System/About',
        meta: { title: '关于' },
        component: () => import('@/views/System/About'),
      },
    ],
  },
];
