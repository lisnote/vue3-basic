<script lang="ts" setup>
import { themeMap, switchTheme } from '@/utils/theme';
import commonStyle from '@/styles/common.module.scss';
import { ElButton } from '@/components/ElementPlus';
import { t } from '@/locales';

const colorVars = [
  {
    title: '主色',
    mainColor: '--el-color-primary',
    subLevelColor: [
      '--el-color-primary-dark-2',
      '--el-color-primary-light-3',
      '--el-color-primary-light-5',
      '--el-color-primary-light-7',
      '--el-color-primary-light-8',
      '--el-color-primary-light-9',
    ],
  },
  {
    title: '成功',
    mainColor: '--el-color-success',
    subLevelColor: [
      '--el-color-success-dark-2',
      '--el-color-success-light-3',
      '--el-color-success-light-5',
      '--el-color-success-light-7',
      '--el-color-success-light-8',
      '--el-color-success-light-9',
    ],
  },
  {
    title: '警告',
    mainColor: '--el-color-warning',
    subLevelColor: [
      '--el-color-warning-dark-2',
      '--el-color-warning-light-3',
      '--el-color-warning-light-5',
      '--el-color-warning-light-7',
      '--el-color-warning-light-8',
      '--el-color-warning-light-9',
    ],
  },
  {
    title: '危险',
    mainColor: '--el-color-danger',
    subLevelColor: [
      '--el-color-danger-dark-2',
      '--el-color-danger-light-3',
      '--el-color-danger-light-5',
      '--el-color-danger-light-7',
      '--el-color-danger-light-8',
      '--el-color-danger-light-9',
    ],
  },
  {
    title: '通知',
    mainColor: '--el-color-info',
    subLevelColor: [
      '--el-color-info-dark-2',
      '--el-color-info-light-3',
      '--el-color-info-light-5',
      '--el-color-info-light-7',
      '--el-color-info-light-8',
      '--el-color-info-light-9',
    ],
  },
];
</script>

<template>
  <div :class="commonStyle.contentArea" class="flex flex-col gap-10px">
    <div class="flex flex-wrap gap-10px">
      <ElButton
        v-for="(theme, key) of themeMap"
        :key="key"
        :style="{ background: theme.background, color: theme.color }"
        class="!ml-0"
        @click="switchTheme(key)"
      >
        {{ t(theme.name) }}
      </ElButton>
    </div>
    <div class="flex flex-wrap gap-10px">
      <div
        v-for="{ title, mainColor, subLevelColor } in colorVars"
        :key="mainColor"
        class="w-182px h-112px rounded overflow-hidden flex flex-col"
      >
        <div
          class="flex-1 p-10px text-2xl"
          :style="{ background: `var(${mainColor})` }"
        >
          {{ title }}
        </div>
        <div class="h-40px flex">
          <div
            v-for="currentColor in subLevelColor"
            :key="currentColor"
            class="flex-1"
            :style="{ background: `var(${currentColor})` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
