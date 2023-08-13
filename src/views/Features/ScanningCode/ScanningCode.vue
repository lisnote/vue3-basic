<script lang="ts" setup>
import { BrowserMultiFormatReader } from '@zxing/library';
import { ref, reactive, UnwrapNestedRefs } from 'vue';
import commonStyle from '@/styles/common.module.scss';

const videoRef = ref();
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
  let deviceId = devices[1].deviceId;
  for (const device of devices) {
    if (device.label.includes('back')) {
      deviceId = device.deviceId;
      break;
    }
  }
  data.unshift('设备ID: ' + deviceId);
  // 开始识别二维码/条形码
  codeReader.decodeFromVideoDevice(deviceId, videoRef.value, (result, err) => {
    if (err) return;
    if (result) data.unshift(result);
  });
}
function stop() {
  codeReader.reset();
}
</script>
<template>
  <div :class="commonStyle.contentArea" class="scanning-code">
    <video ref="videoRef" />
    <div class="control flex flex-col">
      <button @click="start">开始</button>
      <button @click="stop">结束</button>
      <ElScrollbar class="flex-1">
        <div v-for="(item, index) in data" :key="index">
          {{ item }}
        </div>
      </ElScrollbar>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.scanning-code {
  display: flex;

  video {
    background: black;
    width: 100%;
    flex: 1 auto;
    min-width: 0;
  }

  .control {
    width: 200px;
    word-break: break-all;
  }
}
</style>
