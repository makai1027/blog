<script lang='ts' setup>
import WChat from '../../../assets/IMG_4771.jpeg'
</script>

<template>
  <el-popover placement="left" width="200px" trigger="click">
    <div>
      <div class="text-center mb-5px">
        <span>👇👇 --- 微信 --- 👇👇</span>
      </div>
      <el-image :src="WChat" class="w-160px mx-auto" />
      <div class="text-center mt-5px">
        <span>欢迎私信交流~</span>
      </div>
    </div>
    <template #reference>
      <span class="how-to-contact-me fixed top-80px right-10px z-100">
        <el-button type="primary" circle>
          <template #icon>
            <span class="i-lucide:contact-2" />
          </template>
        </el-button>
      </span>
    </template>
  </el-popover>
</template>

<style lang='scss' scoped>

</style>
