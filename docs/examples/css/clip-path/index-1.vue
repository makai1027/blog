<script lang='ts' setup>
import { ElCard, ElCol, ElRow } from 'element-plus'
</script>

<template>
  <div class="custom-wrapper">
    <ElRow :gutter="10">
      <ElCol :span="12" :xs="24" class="mb-10px">
        <ElCard :body-style="{ padding: '10px' }" header="原尺寸图片">
          <img src="../../../assets/xiugou.jpeg" alt="一只小狗">
        </ElCard>
      </ElCol>
      <ElCol :span="12" :xs="24" class="mb-10px">
        <ElCard :body-style="{ padding: '10px' }" header="inset方形剪裁">
          <img class="example-1" src="../../../assets/xiugou.jpeg" alt="一只小狗">
        </ElCard>
      </ElCol>
      <ElCol :span="12" :xs="24" class="mb-10px">
        <ElCard :body-style="{ padding: '10px' }" header="">
          <img src="../../../assets/xiugou.jpeg" alt="一只小狗">
        </ElCard>
      </ElCol>
      <ElCol :span="12" :xs="24" class="mb-10px">
        <ElCard :body-style="{ padding: '10px' }" header="">
          <img src="../../../assets/xiugou.jpeg" alt="一只小狗">
        </ElCard>
      </ElCol>
      <ElCol :span="12" :xs="24" class="mb-10px">
        <ElCard :body-style="{ padding: '10px' }" header="">
          <img src="../../../assets/xiugou.jpeg" alt="一只小狗">
        </ElCard>
      </ElCol>
      <ElCol :span="12" :xs="24" class="mb-10px">
        <ElCard :body-style="{ padding: '10px' }" header="">
          <img src="../../../assets/xiugou.jpeg" alt="一只小狗">
        </ElCard>
      </ElCol>
      <ElCol :span="12" :xs="24" class="mb-10px">
        <ElCard :body-style="{ padding: '10px' }" header="">
          <img src="../../../assets/xiugou.jpeg" alt="一只小狗">
        </ElCard>
      </ElCol>
      <ElCol :span="12" :xs="24" class="mb-10px">
        <ElCard :body-style="{ padding: '10px' }" header="">
          <img src="../../../assets/xiugou.jpeg" alt="一只小狗">
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<style lang='scss' scoped>
  .custom-wrapper {
    .example-1 {
      clip-path: inset(200px 100px);
    }
  }
</style>
