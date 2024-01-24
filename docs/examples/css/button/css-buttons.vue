<script lang='ts' setup>
import { ElCol, ElRow } from 'element-plus'
</script>

<template>
  <div class="custom-wrapper pt-30px px-15px">
    <ElRow :gutter="30">
      <ElCol :lg="8" :xl="6" class="mb-30px">
        <button class="button-1 display-block w-full tracking-0.5em text-lg leading-36px h-40px font-bold bg-#409eff text-white rounded-4px">
          按钮
        </button>
      </ElCol>
      <ElCol :lg="8" :xl="6" class="mb-30px">
        <button class="button-2 display-block w-full tracking-0.5em text-lg leading-36px h-40px font-bold bg-#409eff text-white rounded-4px">
          按钮
        </button>
      </ElCol>
      <ElCol :lg="8" :xl="6" class="mb-30px">
        <button class="button-3 display-block w-full tracking-0.5em text-lg leading-36px h-40px font-bold text-white rounded-4px">
          按钮
        </button>
      </ElCol>
      <ElCol :lg="8" :xl="6" class="mb-30px">
        <button class="button-4 display-block w-full tracking-0.5em text-lg leading-36px h-40px font-bold text-white rounded-4px">
          <span>
            按钮
          </span>
        </button>
      </ElCol>
      <ElCol :lg="8" :xl="6" class="mb-30px">
        <button class="button-5 display-block w-full tracking-0.5em text-lg leading-36px h-40px font-bold bg-#409eff text-white rounded-4px">
          按钮
        </button>
      </ElCol>
      <ElCol :lg="8" :xl="6" class="mb-30px">
        <button class="button-6 display-block w-full tracking-0.5em text-lg leading-36px h-40px font-bold text-white rounded-4px">
          <span class="position-relative z-2">按钮</span>
        </button>
      </ElCol>
      <ElCol :lg="8" :xl="6" class="mb-30px">
        <button class="button-7 display-block w-full tracking-0.5em text-lg leading-36px h-40px font-bold text-white rounded-4px relative overflow-hidden">
          按钮
        </button>
      </ElCol>
      <ElCol :lg="8" :xl="6" class="mb-30px">
        <button class="button-8 display-block w-full tracking-0.5em text-lg leading-36px h-40px font-bold bg-#409eff text-white rounded-4px relative">
          按钮
          <svg class="light" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 234.6 61.3" preserveAspectRatio="none" xml:space="preserve">
            <filter id="glow">
              <feGaussianBlur class="blur" result="coloredBlur" stdDeviation="2" />
              <feTurbulence type="fractalNoise" baseFrequency="0.075" numOctaves="0.3" result="turbulence" />
              <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="30" xChannelSelector="R" yChannelSelector="G" result="displace" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="displace" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <path class="LightningBorderButton_line1" d="m216.3 51.2c-3.7 0-3.7-1.1-7.3-1.1-3.7 0-3.7 6.8-7.3 6.8-3.7 0-3.7-4.6-7.3-4.6-3.7 0-3.7 3.6-7.3 3.6-3.7 0-3.7-0.9-7.3-0.9-3.7 0-3.7-2.7-7.3-2.7-3.7 0-3.7 7.8-7.3 7.8-3.7 0-3.7-4.9-7.3-4.9-3.7 0-3.7-7.8-7.3-7.8-3.7 0-3.7-1.1-7.3-1.1-3.7 0-3.7 3.1-7.3 3.1-3.7 0-3.7 10.9-7.3 10.9-3.7 0-3.7-12.5-7.3-12.5-3.7 0-3.7 4.6-7.3 4.6-3.7 0-3.7 4.5-7.3 4.5-3.7 0-3.7 3.6-7.3 3.6-3.7 0-3.7-10-7.3-10-3.7 0-3.7-0.4-7.3-0.4-3.7 0-3.7 2.3-7.3 2.3-3.7 0-3.7 7.1-7.3 7.1-3.7 0-3.7-11.2-7.3-11.2-3.7 0-3.7 3.5-7.3 3.5-3.7 0-3.7 3.6-7.3 3.6-3.7 0-3.7-2.9-7.3-2.9-3.7 0-3.7 8.4-7.3 8.4-3.7 0-3.7-14.6-7.3-14.6-3.7 0-3.7 5.8-7.3 5.8-2.2 0-3.8-0.4-5.5-1.5-1.8-1.1-1.8-2.9-2.9-4.8-1-1.8 1.9-2.7 1.9-4.8 0-3.4-2.1-3.4-2.1-6.8s-9.9-3.4-9.9-6.8 8-3.4 8-6.8c0-2.2 2.1-2.4 3.1-4.2 1.1-1.8 0.2-3.9 2-5 1.8-1 3.1-7.9 5.3-7.9 3.7 0 3.7 0.9 7.3 0.9 3.7 0 3.7 6.7 7.3 6.7 3.7 0 3.7-1.8 7.3-1.8 3.7 0 3.7-0.6 7.3-0.6 3.7 0 3.7-7.8 7.3-7.8h7.3c3.7 0 3.7 4.7 7.3 4.7 3.7 0 3.7-1.1 7.3-1.1 3.7 0 3.7 11.6 7.3 11.6 3.7 0 3.7-2.6 7.3-2.6 3.7 0 3.7-12.9 7.3-12.9 3.7 0 3.7 10.9 7.3 10.9 3.7 0 3.7 1.3 7.3 1.3 3.7 0 3.7-8.7 7.3-8.7 3.7 0 3.7 11.5 7.3 11.5 3.7 0 3.7-1.4 7.3-1.4 3.7 0 3.7-2.6 7.3-2.6 3.7 0 3.7-5.8 7.3-5.8 3.7 0 3.7-1.3 7.3-1.3 3.7 0 3.7 6.6 7.3 6.6s3.7-9.3 7.3-9.3c3.7 0 3.7 0.2 7.3 0.2 3.7 0 3.7 8.5 7.3 8.5 3.7 0 3.7 0.2 7.3 0.2 3.7 0 3.7-1.5 7.3-1.5 3.7 0 3.7 1.6 7.3 1.6s3.7-5.1 7.3-5.1c2.2 0 0.6 9.6 2.4 10.7s4.1-2 5.1-0.1c1 1.8 10.3 2.2 10.3 4.3 0 3.4-10.7 3.4-10.7 6.8s1.2 3.4 1.2 6.8 1.9 3.4 1.9 6.8c0 2.2 7.2 7.7 6.2 9.5-1.1 1.8-12.3-6.5-14.1-5.5-1.7 0.9-0.1 6.2-2.2 6.2z" fill="transparent" stroke="#fff" />
            <path class="LightningBorderButton_line2" d="m216.3 52.1c-3 0-3-0.5-6-0.5s-3 3-6 3-3-2-6-2-3 1.6-6 1.6-3-0.4-6-0.4-3-1.2-6-1.2-3 3.4-6 3.4-3-2.2-6-2.2-3-3.4-6-3.4-3-0.5-6-0.5-3 1.4-6 1.4-3 4.8-6 4.8-3-5.5-6-5.5-3 2-6 2-3 2-6 2-3 1.6-6 1.6-3-4.4-6-4.4-3-0.2-6-0.2-3 1-6 1-3 3.1-6 3.1-3-4.9-6-4.9-3 1.5-6 1.5-3 1.6-6 1.6-3-1.3-6-1.3-3 3.7-6 3.7-3-6.4-6-6.4-3 2.5-6 2.5h-6c-3 0-3-0.6-6-0.6s-3-1.4-6-1.4-3 0.9-6 0.9-3 4.3-6 4.3-3-3.5-6-3.5c-2.2 0-3.4-1.3-5.2-2.3-1.8-1.1-3.6-1.5-4.6-3.3s-4.4-3.5-4.4-5.7c0-3.4 0.4-3.4 0.4-6.8s2.9-3.4 2.9-6.8-0.8-3.4-0.8-6.8c0-2.2 0.3-4.2 1.3-5.9 1.1-1.8 0.8-6.2 2.6-7.3 1.8-1 5.5-2 7.7-2 3 0 3 2 6 2s3-0.5 6-0.5 3 5.1 6 5.1 3-1.1 6-1.1 3-5.6 6-5.6 3 4.8 6 4.8 3 0.6 6 0.6 3-3.8 6-3.8 3 5.1 6 5.1 3-0.6 6-0.6 3-1.2 6-1.2 3-2.6 6-2.6 3-0.6 6-0.6 3 2.9 6 2.9 3-4.1 6-4.1 3 0.1 6 0.1 3 3.7 6 3.7 3 0.1 6 0.1 3-0.6 6-0.6 3 0.7 6 0.7 3-2.2 6-2.2 3 4.4 6 4.4 3-1.7 6-1.7 3-4 6-4 3 4.7 6 4.7 3-0.5 6-0.5 3-0.8 6-0.8 3-3.8 6-3.8 3 6.3 6 6.3 3-4.8 6-4.8 3 1.9 6 1.9 3-1.9 6-1.9 3 1.3 6 1.3c2.2 0 5-0.5 6.7 0.5 1.8 1.1 2.4 4 3.5 5.8 1 1.8 0.3 3.7 0.3 5.9 0 3.4 3.4 3.4 3.4 6.8s-3.3 3.4-3.3 6.8 4 3.4 4 6.8c0 2.2-6 2.7-7 4.4-1.1 1.8 1.1 6.7-0.7 7.7-1.6 0.8-4.7-1.1-6.8-1.1z" fill="transparent" stroke="#fff" />
          </svg>
        </button>
      </ElCol>
      <ElCol :lg="8" :xl="6" class="mb-30px">
        <button class="display-block w-full tracking-0.5em text-lg leading-36px h-40px font-bold bg-#409eff text-white rounded-4px relative overflow-hidden">
          按钮
        </button>
      </ElCol>
      <ElCol :lg="8" :xl="6" class="mb-30px">
        <button class="display-block w-full tracking-0.5em text-lg leading-36px h-40px font-bold bg-#409eff text-white rounded-4px relative overflow-hidden">
          按钮
        </button>
      </ElCol>
      <ElCol :lg="8" :xl="6" class="mb-30px">
        <button class="display-block w-full tracking-0.5em text-lg leading-36px h-40px font-bold bg-#409eff text-white rounded-4px relative overflow-hidden">
          按钮
        </button>
      </ElCol>
      <ElCol :lg="8" :xl="6" class="mb-30px">
        <button class="display-block w-full tracking-0.5em text-lg leading-36px h-40px font-bold bg-#409eff text-white rounded-4px relative overflow-hidden">
          按钮
        </button>
      </ElCol>
    </ElRow>
  </div>
</template>

<style lang='scss' scoped>
  .custom-wrapper {
    background-color: #151515;
    *  {
      box-sizing: border-box;
    }
  }
    @keyframes bp-animate {
        from {
            background-position: 0 50%;
        }

        25% {
            background-position: 50% 100%;
        }

        50% {
            background-position: 100% 50%;
        }

        75% {
            background-position: 50% 0%;
        }

        to {
            background-position: 0 50%;
        }
    }

    @keyframes shakeText {
        from {
            clip-path: inset(50% 50% 50% 50%);
            transform: translateY(-10px);
        }
        10% {
            clip-path: inset(31% 0% 40% 0%);
            transform: translate(-10px, 10px);
        }
        20% {
            clip-path: inset(39% 0% 15% 0%);
            transform: translate(10px, 0px);
        }
        30% {
            clip-path: inset(45% 0% 40% 0%);
            transform: translate(-10px, 10px);
        }
        40% {
            clip-path: inset(45% 0% 6% 0%);
            transform: translate(10px, -10px);
        }
        50% {
            clip-path: inset(14% 0% 61% 0%);
            transform: translate(-10px, 10px);
        }
        60% {
            clip-path: inset(50% 50% 50% 50%);
            transform: translate(10px, -10px);
        }
        70% {
            clip-path: inset(39% 0% 15% 0%);
            transform: translate(-10px, 10px);
        }
        80% {
            clip-path: inset(31% 0% 40% 0%);
            transform: translate(10px, -10px);
        }
        90% {
            clip-path: inset(45% 0% 40% 0%);
            transform: translate(-10px, 10px);
        }
        100% {
            clip-path: inset(50% 50% 50% 50%);
            transform: translate(0px, 0px);
        }
    }
    @keyframes lightning-2 {
      from {
        stroke-dashoffset: 500;
      }
      to {
        stroke-dashoffset: -500;
      }
    }
    @keyframes lightning-1 {
      from {
        stroke-dashoffset: 0;
      }
      to {
        stroke-dashoffset: -1000;
      }
    }
    .button-1 {
        background-size: 200% 600%;
        background-position: 0 50%;
        background-image: radial-gradient(closest-side,#d628fe 6%,#35a2fd 50%,#d628fe 100%);
        animation: 5s linear infinite bp-animate;
    }
    .button-2 {
        background-image: linear-gradient(to right, #25aae1, #40e495, #30dd8a, #2bb673);
        box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
        background-size: 300% 100%;
        will-change: background-position;
        transition: all 0.5s ease-in-out;
        &:hover {
            background-position: 100% 0 ;
        }
    }
    .button-3 {
        border: 2px solid #409eff;
        color: #409eff;
        transition: all 0.5s ease-in-out;
        &:hover {
            background-color: #409eff;
            color: white;
            box-shadow: 10px 10px 99px 6px #409eff;
        }
    }
    .button-4 {
        position: relative;
        border: 2px solid #409eff;
        color: #409eff;
        overflow: hidden;
        &::after {
            content: '';
            position: absolute;
            left: 50%;
            bottom: 0;
            width: 0;
            height: 0;
            transform: translate(-50%, 50%);
            transform-origin: center;
            background-color: #409eff;
            transition: all 0.4s ease-in-out;
            border-radius: 50%;
            z-index: 0;
        }
        span {
            position: relative;
            z-index: 1;
        }

        &:hover {
            color: white;
            &::after {
                width: 500px;
                height: 500px;
            }
        }
    }
    .button-5 {
        position: relative;
        &::after, &::before {
            position: absolute;
            content: '';
            width: 0;
            height: 0;
            box-sizing: border-box;
            border: 2px solid transparent;
            border-radius: 4px;
        }
        &::after {
            bottom: 0;
            right: 0;
        }
        &::before {
            top: 0;
            left: 0;
        }

        &:hover {
            &::after {
                border-bottom-color: red;
                border-left-color: red;
                width: 100%;
                // transition放在这里主要是为了移除hover，border可以立即消失
                transition: border-color 0s ease-out 0.2s, width 0.1s ease-out 0.2s, height 0.1s ease-out 0.3s;
                height: 100%;
            }
            &::before {
                border-top-color: red;
                border-right-color: red;
                width: 100%;
                transition: width .1s ease-out,height .1s ease-out .1s;
                height: 100%;
            }
        }
    }
    .button-6 {
        border: 2px solid #409eff;
        color: black;
        position: relative;
        overflow: hidden;
        &::after {
            content: '';
            position: absolute;
            left: 50%;
            top: 0%;
            transform: translateX(-50%) skew(45deg);
            transform-origin: center;
            width: 15%;
            height: 100%;
            background-color: #409eff;
            transition: width 0.1s ease-out;
        }
        &:hover {
            color: white;
            &::after {
                width: 200%;
            }
        }
    }
    .button-7 {
        border: 2px solid #409eff;
        color: #409eff;
        &::after {
            content: '按钮';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border: 2px solid #409eff;
            border-radius: 4px;
            clip-path: inset(50% 50% 50% 50%);
        }
        &:hover {
            &::after {
                animation-name: shakeText;
                animation-duration: 1s;
                animation-timing-function: steps(2);
                text-shadow: -3px -3px 0 #409eff, 3px 3px 0 red;
            }
        }
    }
    .button-8 {
        .light {
            position: absolute;
            left: -10px;
            top: -10px;
            width: calc(100% + 20px);
            height: calc((100% + 20px));
            pointer-events: none;
            opacity: 0;
            .LightningBorderButton_line1 {
              stroke-dashoffset: 0;
              stroke: #f6de8d;
              stroke-dasharray: 100;
              filter: url(#glow)
            }
            .LightningBorderButton_line2 {
              stroke-dashoffset: 500;
              stroke: #6bfeff;
              stroke-dasharray: 100;
              filter: url(#glow)
            }
        }
        &:hover {
            .light {
                opacity: 1;
                transition: opacity .4s;
                transition-delay: .1s;
                .LightningBorderButton_line1 {
                  animation: lightning-1 3s linear infinite;
                }
                .LightningBorderButton_line2 {
                  animation: lightning-2 3s linear infinite;
                }
            }
        }
    }
</style>
