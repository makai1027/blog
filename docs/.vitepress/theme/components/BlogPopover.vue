<script lang='ts' setup>
import { ElImage } from 'element-plus'
import WChat from '../../../assets/IMG_4771.jpeg'
</script>

<template>
  <div class="card box-border position-relative mx-auto mb-10px w-full overflow-hidden p-10px rounded">
    <div class="flex w-full items-center">
      <span class="i-ic:round-wechat mr-2 success" />
      <span class="text-sm">微信</span>
    </div>
    <div class="w-full text-center">
      <ElImage :src="WChat" class="w-160px mx-auto" />
    </div>
    <div class="text-center text-sm label mt-5px">
      <span>欢迎私信交流~</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  box-shadow: var(--box-shadow);
  transition: all 0.3s;
  background-color: rgba(var(--bg-gradient));

  &:hover {
    box-shadow: var(--box-shadow-hover);
  }
}
.success {
  color: var(--el-color-success)
}

.label {
  color: var(--description-font-color);
}
</style>
