<script setup lang="ts">
import DPlayer from 'dplayer';
import { ref, onMounted } from 'vue';
import commonStyle from '@/styles/common.module.scss';

const video = ref();
onMounted(() => {
  new DPlayer({
    container: video.value,
    video: {
      url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
    },
  });
});
</script>
<template>
  <div :class="commonStyle.contentArea">
    <div ref="video" />
  </div>
</template>
