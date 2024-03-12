<script lang='ts' setup>
import { ElCard, ElCol, ElRow } from 'element-plus'
</script>

<template>
  <div class="custom-wrapper">
    <ElRow :gutter="10">
      <ElCol :span="12" :xs="24" class="mb-10px">
        <ElCard size="small" :body-style="{ padding: '10px' }" header="原尺寸图片">
          <img src="../../../assets/xiugou.jpeg" alt="一只小狗">
        </ElCard>
      </ElCol>
      <ElCol :span="12" :xs="24" class="mb-10px">
        <ElCard size="small" :body-style="{ padding: '10px' }" header="inset方形剪裁">
          <img class="example-1" src="../../../assets/xiugou.jpeg" alt="一只小狗">
        </ElCard>
      </ElCol>
      <ElCol :span="12" :xs="24" class="mb-10px">
        <ElCard size="small" :body-style="{ padding: '10px' }" header="circle剪裁">
          <img class="example-2" src="../../../assets/xiugou.jpeg" alt="一只小狗">
        </ElCard>
      </ElCol>
      <ElCol :span="12" :xs="24" class="mb-10px">
        <ElCard size="small" :body-style="{ padding: '10px' }" header="ellipsis剪裁">
          <img class="example-3" src="../../../assets/xiugou.jpeg" alt="一只小狗">
        </ElCard>
      </ElCol>
      <ElCol :span="12" :xs="24" class="mb-10px">
        <ElCard size="small" :body-style="{ padding: '10px' }" header="polygon根据点的位置定义多边形">
          <img class="example-4" src="../../../assets/xiugou.jpeg" alt="一只小狗">
        </ElCard>
      </ElCol>
      <ElCol :span="12" :xs="24" class="mb-10px">
        <ElCard size="small" :body-style="{ padding: '10px' }" header="path 剪裁任意形状">
          <img class="example-5" src="../../../assets/xiugou.jpeg" alt="一只小狗">
        </ElCard>
      </ElCol>
      <ElCol :span="12" :xs="24" class="mb-10px">
        <ElCard size="small" :body-style="{ padding: '10px' }" header="content-box裁剪">
          <img class="example-6" src="../../../assets/xiugou.jpeg" alt="一只小狗">
        </ElCard>
      </ElCol>
      <ElCol :span="12" :xs="24" class="mb-10px">
        <ElCard size="small" :body-style="{ padding: '10px' }" header="padding-box剪裁">
          <img class="example-7" src="../../../assets/xiugou.jpeg" alt="一只小狗">
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<style lang='scss' scoped>
  .custom-wrapper {
    .example-1 {
      // clip-path: inset(10% 10% round 10px);
      clip-path: inset(10px 15% 0 20px round 10px 5px);
    }
    .example-2 {
      clip-path: circle(50px);
      // clip-path: circle(50px at right);
      // clip-path: circle(50px at 50px);
      // clip-path: circle(50px at top);
      // clip-path: circle(closest-side at 4rem);
      // clip-path: circle(farthest-side);
      shape-outside: circle(50px);
    }
    .example-3 {
      clip-path: ellipse(60px 40px);
      shape-outside: ellipse(60px 40px);
    }

    .example-4 {
      clip-path: polygon(00% 50%, 50% 10%, 100% 50%, 50% 100%, 0% 50%);
    }

    .example-5 {
      clip-path: path(
        'M 20 240 \
        C 20 0 300 0 300 240 Z');
    }

    .example-6 {
      margin: 10px;
      padding: 10px;
      border: 2px solid black;
      clip-path: content-box;
    }

    .example-7 {
      padding: 15px;
      clip-path: padding-box;
    }
  }
</style>
