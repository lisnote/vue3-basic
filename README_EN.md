# vue3-basic

[中文](./README.md) | [English](./README_EN.md)

This project can be used as a base framework for starting Vue3 projects.

## TodoList

### Overall Framework

- [x] Configure basic framework: vite+vue3+typescript
- [x] Use pnpm as package manager to install dependencies
- [x] Configure CSS preprocessor: sass
- [x] Configure UI component: element-ui
- [x] Configure routes: vue-router
- [x] Configure state management: pinia
- [x] Configure network interaction: axios
- [x] Configure mock: express
- [x] Configure code style check: prettier
- [x] Configure CSS/SCSS check: stylelint
- [x] Configure JS/TS check: eslint
- [x] Configure git action: husky
- [x] Configure lint-staged
- [x] Configure path alias
- [x] Configure global components
- [x] Configure navigation bar

### Feature List

- [ ] Login
  - [ ] verify code
- [ ] Home page
  - [ ] visual chart: echart
- [ ] Encapsulation
  - [ ] element-plus
    - [ ] table encapsulation
    - [ ] form component encapsulation
    - [ ] default value encapsulation
    - [x] theme switching
  - [ ] axios encapsulation
    - [ ] axios instance and default setting
    - [ ] file download
    - [ ] centralized management of error code
    - [ ] token auto update
- [ ] Functional
  - [ ] marked: markdown rendering
    - [ ] hightlightjs: provide syntax highlighting support
    - [ ] KaTex: provide support for LaTeX syntax
  - [ ] CodeMirror: online code editor, can also provide code highlighting for marked
  - [ ] pdf.js: PDF preview
  - [ ] docx-preview: docx preview
  - [ ] wangeditor: rich text editor
  - [ ] socket.io: WebSocket real-time communication
  - [ ] GraphQL: Merge requests to reduce network IO
  - [ ] webRTC: Real-time Voice/Video Call
  - [ ] dplayer: danmaku video
  - [x] zxing: QR/barcode recognition
  - [ ] canvas: add watermark, merge images & canvas, export
  - [ ] amap-js: AMap
  - [ ] threejs: Digital Twin/3D animation
- [x] Exception Page
  - [x] 403
  - [x] 404
  - [x] 500
- [ ] Toys
  - [ ] Game
    - [ ] don't touch the white tile
    - [ ] control the 3D toy car
  - [ ] Backend Service
    - [ ] Synchronous projection room
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
    - [ ] NovalAI: text generates manga images
    - [ ] Real-ESRGAN: Image/Video Super-Resolution
- [ ] System Management
  - [ ] Member Management
  - [ ] Role Management
  - [ ] Role Permission
  - [ ] About
