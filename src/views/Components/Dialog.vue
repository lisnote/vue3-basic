<script lang="ts" setup>
import { ref } from 'vue';
import { ElButton, ElDialog } from '@/components/ElementPlus';
import { WarningBox } from '@/components/MessageBox';

const dialogVisible = ref(false);

const handleClose = (done: () => void) => {
  WarningBox('Are you sure to close this dialog?')
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
</script>

<template>
  <div>
    <ElButton text @click="dialogVisible = true">
      click to open the Dialog
    </ElButton>

    <ElDialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
      :before-close="handleClose"
    >
      <span>This is a message</span>
      <template #footer>
        <span class="dialog-footer">
          <ElButton @click="dialogVisible = false">Cancel</ElButton>
          <ElButton type="primary" @click="dialogVisible = false">
            Confirm
          </ElButton>
        </span>
      </template>
    </ElDialog>
  </div>
</template>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
