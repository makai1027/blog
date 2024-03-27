<script lang='ts' setup>

</script>

<template>
  <div class="custom-wrapper h-500px relative bg-white">
    <div class="absolute w-full h-full inset-0 overflow-hidden">
      <div class="aurora h-500px opacity-50 -inset-10px" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
@keyframes auroraAnimation {
  from {
    background-position: 50% 50%, 50% 50%;
  }

  to {
    background-position: 350% 50%, 350% 50%;
  }
}

.aurora {
  // 顺时针倾斜100deg，同时利用重复线性渐变将图像重复排列
  --stripes: repeating-linear-gradient(
    100deg,
    #fff 0%,
    #fff 7%,
    transparent 10%,
    transparent 12%,
    #fff 16%
  );
  // 顺时针倾斜100deg，同时利用重复线性渐变将图像重复排列
  --stripesDark: repeating-linear-gradient(
    100deg,
    #000 0%,
    #000 7%,
    transparent 10%,
    transparent 12%,
    #000 16%
  );

  // 顺时针倾斜100deg，同时利用重复线性渐变将图像重复排列
  --rainbow: repeating-linear-gradient(
    100deg,
    #60a5fa 10%,
    #e879f9 15%,
    #60a5fa 20%,
    #5eead4 25%,
    #60a5fa 30%
  );
  // 多个重复线性渐变组合形成不同比例宽度的条状背景
  background-image: var(--stripes), var(--rainbow);
  background-size: 300% 200%;
  background-position: 50% 50%, 50% 50%;
  // 高斯模糊背景并且反转图像颜色
  filter: blur(10px) invert(1);
  // 图层蒙版使用径向渐变，径向渐变采用ellipsis椭圆形状，并设置中心点在由上方
  mask-image: radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%);
  // 取消鼠标事件
  pointer-events: none;
  // 伪类:: 和 : 作用一直却别在于兼容性，gulp构建后一般会转为::
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: var(--stripes), var(--rainbow);
    background-size: 200% 100%;
    animation: auroraAnimation 60s linear infinite;
    // 背景图相对视图口的位置设置为固定定位
    background-attachment: fixed;
    // 背景颜色混合模式
    mix-blend-mode: difference;
  }
}
</style>
