# vue3-basic

[中文](./README.md) | [English](./README_EN.md)

Vue3 项目案例.

[在线预览](htttps://vue3-basic.pages.dev)

## TodoList

### 整体框架

- [x] 配置基本框架: vite+vue3+typescript
- [x] 使用 pnpm 作为包管理器安装依赖
- [x] 配置 css 预处理器: sass
- [x] 配置 ui 组件: element-ui
- [x] 配置路由: vue-router
- [x] 配置状态管理 pinia
- [x] 配置网络交互: axios
- [x] 配置 mock: vite-mock-plugin + axios adapter
- [x] 配置代码风格检查: prettier
- [x] 配置 css/scss 检查: stylelint
- [x] 配置 js/ts 检查: eslint
- [x] 配置 git action: husky
- [x] 配置 lint-staged
- [x] 配置路径别名
- [x] 配置全局组件
- [x] 配置导航栏
- [x] TSX 支持
- [x] 国际化支持
- [x] 多主题支持

### 功能列表

- [x] axios 封装
  - [x] axios 实例及默认值
  - [x] 文件下载
  - [x] 全局错误码管理
  - [x] axios 生产环境 mock 适配器
- [x] 登录
  - [x] 验证码
- [ ] 首页
  - [ ] echart 图表分析
- [ ] 组件
  - [ ] element-plus
    - [ ] form 组件封装
      - [ ] 默认值封装
    - [ ] table 封装
      - [ ] props 解析
  - [x] countjs: 数字动画
- [ ] 功能
  - [x] 切换主题
  - [x] 文件下载
  - [x] marked: markdown 渲染
    - [x] hightlightjs: 提供语法高亮支持
    - [ ] KaTex: 提供 LaTeX 语法支持
  - [x] CodeMirror: 代码在线编辑器, 也可为 marked 提供代码高亮
  - [x] pdf.js: PDF 预览
  - [x] wangeditor: 富文本编辑器
  - [x] dplayer: 弹幕视频
  - [x] 水印
  - [x] amap-js: 高德地图
  - [x] 腾讯地图服务
  - [x] threejs: 数字孪生/3D 动画
- [x] 异常页面
  - [x] 403
  - [x] 404
  - [x] 500
- [ ] 小玩具
  - [ ] 游戏
    - [ ] 别踩白块
    - [ ] 3D 小车控制
    - [ ] 我的世界
  - [ ] 后端服务
    - [ ] socket.io: Websocket 实时通信
    - [ ] graphQL: 合并请求减少网络 IO
    - [ ] webRTC: 语音/视频通话
    - [ ] 同步放映室
      - [ ] 防抖, 延后执行视频同步
      - [ ] 弹幕聊天(支持表情包)
    - [ ] 直播间
      - [ ] 评论区
      - [ ] 弹幕聊天(支持表情包)
    - [ ] 文件上传服务
      - [ ] 大文件切片
      - [ ] 断点续传
      - [ ] md5 秒传
    - [ ] vits: 文本转语音
    - [ ] StableDiffusion: 文本生成动漫图片
    - [ ] Real-ESRGAN: 图像/视频高清修复
- [x] 系统管理
  - [x] 职位与权限
  - [x] 用户管理
  - [x] 关于
