<script lang='ts' setup>
const classes = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
</script>

<template>
  <div class="container">
    <div class="cubescaler">
      <div class="cube">
        <div v-for="i in classes" :key="i" class="main" :class="i">
          <div class="offset">
            <div class="slide front" />
            <div class="slide back" />
            <div class="slide left" />
            <div class="slide right" />
            <div class="slide top" />
            <div class="slide bottom" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
@keyframes animation-b {
  from {
    transform: translate3d(83px, 46px, 0) scale(1);
    opacity: 0;
  }
  33.33% {
    transform: translate3d(53px, 26px, 0px) scale(1);
    opacity: 1;
  }
  66.66% {
    transform: matrix(1,0, 0, 1, 53, 26);
    opacity: 1;
  }
  to {
    transform: matrix(1,0, 0, 1, 53, 26);
    opacity: 0;
  }
}

@keyframes animation-c {
  from {
    transform: translate3d(-83px, 44px, 0);
    opacity: 1;
  }
  33.33% {
    transform: translate3d(-53px, 24px, 0px);
  }
  66.66% {
    transform: translate3d(-53px, 24px, 0px) scale(1);
    opacity: 1;
  }
  to {
    transform: translate3d(-26px, 12px, 0px) scale(0.5);
    opacity: 0;
  }
}
.container {
  --w: 75px;
  --w-h: 37.5px;
  --bg-color: rgba(102, 204, 51, 0.6);
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #151515;
  .cubescaler {
    transform: matrix(0.75, 0, 0, 0.75, 0, 0);
  }
  .cube {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    justify-content: center;
    height: 250px;
    .main {
      position: absolute;
      width: var(--w);
      height: var(--w);
      transform-style: preserve-3d;
      will-change: transform;
      transform-origin: 50% 50%;
      .offset {
        transform-style: preserve-3d;
        will-change: transform;
        transform-origin: 50% 50%;
        transform: rotateY(48deg) rotateX(-20deg) rotateZ(-20deg);
        * {
          position: absolute;
          width: var(--w);
          height: var(--w);
          background-color: var(--bg-color);
          box-shadow: var(--bg-color) 0px;
          border: 1px solid rgba(white, 0.6);
          transform-origin: 50% 50%;
          will-change: transform;
        }

        .top {
          transform: rotateX(90deg) translateZ(var(--w-h));
        }
        .bottom {
          transform: rotateX(-90deg) translateZ(var(--w-h));
        }
        .right {
          transform: rotateY(0deg) translateZ(var(--w-h));
        }
        .left {
          transform: rotateY(-180deg) translateZ(var(--w-h));
        }
        .front {
          transform: rotateY(-90deg) translateZ(var(--w-h));
        }
        .back {
          transform: rotateY(90deg) translateZ(var(--w-h));
        }
      }

      &.b {
        transform: matrix(1,0, 0, 1, 83, 46);
        // transform: translate3d(53px, 26px, 0px);
        animation: 1.8s ease-in-out infinite animation-b;
      }
      &.c {
        transform: translate3d(-53px, 24px, 0px);
        animation: 1.8s ease-in-out infinite animation-c;
      }
      &.d {
        // transform: translate3d(0px, -84px, 0);
        transform: translate3d(0px, -66px, 0px);
        // opacity: 0;
      }
      &.e {
        // transform: translate3d(0, 70px, 0);
        transform: translate3d(0px, 50px, 0px);
        // opacity: 0;
      }
      &.f {
        // transform: translate3d(-72px, -62px, 0);
        transform: translate3d(-52px, -42px, 0px);
        // opacity: 0;
      }
      &.g {
        // transform: translate3d(73px, -61px, 0);
        transform: translate3d(53px, -41px, 0px);
        // opacity: 0;
      }
      &.h {
        // transform: translate3d(0px, -42px, 0);
        transform: translate3d(0px, -16px, 0px);
        // opacity: 0;
      }
    }
  }
}
</style>
