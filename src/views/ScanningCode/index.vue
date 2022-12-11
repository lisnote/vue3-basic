<script lang="ts" setup>
import { BrowserMultiFormatReader } from '@zxing/library';
import { reactive, UnwrapNestedRefs } from 'vue';

// 扫码
const data: UnwrapNestedRefs<unknown[]> = reactive(['识别二维码/条形码']);
const codeReader = new BrowserMultiFormatReader();
async function start() {
  // 获取设备列表
  const devices = await codeReader.listVideoInputDevices();
  if (devices.length === 0) {
    data.unshift('查找不到摄像头');
    return;
  }
  // 获取后置摄像头设备ID
  let deviceId = devices[0].deviceId;
  for (const device of devices) {
    if (device.label.includes('back')) {
      deviceId = device.deviceId;
      break;
    }
  }
  data.unshift('设备ID: ' + deviceId);
  // 开始识别二维码/条形码
  codeReader.decodeFromVideoDevice(deviceId, 'video', (result, err) => {
    if (err) return;
    if (result) data.unshift(result);
  });
}
function stop() {
  codeReader.reset();
}
</script>
<template>
  <button @click="start">开始</button>
  <button @click="stop">结束</button>
  <video id="video" />
  <div v-for="(item, index) in data" :key="index" class="output">
    {{ item }}
  </div>
</template>
<style lang="scss" scoped>
#video {
  background: black;
  width: 100%;
}

.output {
  word-break: break-all;
}
</style>
