<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessageBox, ElButton, ElDialog } from 'element-plus';

const dialogVisible = ref(false);

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
</script>

<template>
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
</template>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
