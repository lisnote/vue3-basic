# vue3-basic

[中文](./README.md) | [English](./README_EN.md)

Vue3 projects example.

[Preview](htttps://vue3-basic.pages.dev)

## TodoList

### Overall Framework

- [x] Configure basic framework: vite+vue3+typescript
- [x] Use pnpm as package manager to install dependencies
- [x] Configure CSS preprocessor: sass
- [x] Configure UI component: element-ui
- [x] Configure routes: vue-router
- [x] Configure state management: pinia
- [x] Configure network interaction: axios
- [x] Configure mock: vite-mock-plugin + axios adapter
- [x] Configure code style check: prettier
- [x] Configure CSS/SCSS check: stylelint
- [x] Configure JS/TS check: eslint
- [x] Configure git action: husky
- [x] Configure lint-staged
- [x] Configure path alias
- [x] Configure global components
- [x] Configure navigation bar
- [x] TSX support
- [x] i18n support
- [x] multi theme support

### Feature List

- [x] axios encapsulation
  - [x] axios instance and default setting
  - [x] file download
  - [x] centralized management of error code
  - [x] axios prod mock adapter
- [x] Login
  - [x] verify code
- [ ] Home page
  - [ ] visual chart: echart
- [ ] Component
  - [ ] element-plus
    - [ ] form component encapsulation
      - [ ] default value encapsulation
    - [ ] table encapsulation
      - [ ] props parser
  - [x] countjs: number animation
- [ ] Functional
  - [x] theme switch
  - [x] file download
  - [x] marked: markdown rendering
    - [x] hightlightjs: provide syntax highlighting support
    - [ ] KaTex: provide support for LaTeX syntax
  - [x] CodeMirror: online code editor, can also provide code highlighting for marked
  - [x] pdf.js: PDF preview
  - [x] wangeditor: rich text editor
  - [x] dplayer: danmaku video
  - [x] watermark
  - [x] amap-js: AMap
  - [x] tencent map service
  - [x] threejs: Digital Twin/3D animation
- [x] Exception Page
  - [x] 403
  - [x] 404
  - [x] 500
- [ ] Toys
  - [ ] Game
    - [ ] Don't Tap The White Tile
    - [ ] control the 3D toy car
    - [ ] Minecraft
  - [ ] Backend Service
    - [ ] socket.io: WebSocket real-time communication
    - [ ] GraphQL: Merge requests to reduce network IO
    - [ ] webRTC: Real-time Voice/Video Call
    - [ ] Synchronous video
      - [ ] Debounce, deferred execution of video synchronization
      - [ ] Danmaku chat (support for emoji)
    - [ ] Live broadcast room
      - [ ] Comment section
      - [ ] Danmaku chat (support for emoji)
    - [ ] File upload service
      - [ ] Large file slicing
      - [ ] Breakpoint continuation
      - [ ] md5 acceleration
    - [ ] vits: text to speech
    - [ ] StableDiffusion: text generates images
    - [ ] Real-ESRGAN: Image/Video Super-Resolution
- [x] System Management
  - [ ] Role Permission
  - [ ] User Management
  - [ ] About
