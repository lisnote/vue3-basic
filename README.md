# vue3-basic

[中文](./README.md) | [English](./README_EN.md)

这个项目可以作为启动 Vue3 项目的基础框架.

## TodoList

### 整体框架

- [x] 配置基本框架: vite+vue3+typescript
- [x] 使用 pnpm 作为包管理器安装依赖
- [x] 配置 css 预处理器: sass
- [x] 配置 ui 组件: element-ui
- [x] 配置路由: vue-router
- [x] 配置状态管理 pinia
- [x] 配置网络交互: axios
- [x] 配置 mock: express
- [x] 配置代码风格检查: prettier
- [x] 配置 css/scss 检查: stylelint
- [x] 配置 js/ts 检查: eslint
- [x] 配置 git action: husky
- [x] 配置 lint-staged
- [x] 配置路径别名
- [x] 配置全局组件
- [x] 配置导航栏

### 功能列表

- [ ] 登录
  - [ ] 验证码
- [ ] 首页
  - [ ] echart 图表分析
- [ ] 封装
  - [ ] element-plus
    - [ ] table 封装
    - [ ] form 组件封装
    - [ ] 默认值封装
    - [x] 主题切换
  - [ ] axios 封装
    - [ ] axios 实例及默认值
    - [ ] 文件下载
    - [ ] 全局错误码管理
    - [ ] token 自动更新
  - [ ] socket.io: Websocket 实时通信
  - [ ] graphQL: 合并请求减少网络 IO
  - [ ] webRTC: 语音/视频通话
- [ ] 功能
  - [ ] marked: markdown 渲染
    - [ ] hightlightjs: 提供语法高亮支持
    - [ ] KaTex: 提供 LaTeX 语法支持
  - [ ] CodeMirror: 代码在线编辑器, 也可为 marked 提供代码高亮
  - [ ] pdf.js: PDF 预览
  - [ ] wangeditor: 富文本编辑器
  - [ ] dplayer: 弹幕视频
  - [x] zxing: 二维码/条形码识别
  - [ ] canvas: 添加水印, 合并图片 & canvas, 导出
  - [ ] amap-js: 高德地图
  - [ ] threejs: 数字孪生/3D 动画
- [ ] 异常页面
  - [ ] 403
  - [ ] 404
  - [ ] 500
- [ ] 小玩具
  - [ ] 游戏
    - [ ] 别踩白块
    - [ ] 3D 小车控制
  - [ ] 后端服务
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
    - [ ] NovalAI: 文本生成动漫图片
    - [ ] Real-ESRGAN: 图像/视频高清修复
- [ ] 关于
