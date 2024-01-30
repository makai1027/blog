<script lang='ts' setup>
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import { useTimeoutPoll } from '@vueuse/core'
import { gsap } from 'gsap'

const hour = ref(0)
const minute = ref(0)
const second = ref(0)

function calculTime() {
  const date = new Date()
  hour.value = date.getHours()
  minute.value = date.getMinutes()
  second.value = date.getSeconds()
}

function mapNum(num: number): string {
  return num < 10 ? `0${num}` : `${num}`
}

const timeStampArr = computed(() => {
  return `${mapNum(hour.value)}:${mapNum(minute.value)}:${mapNum(second.value)}`.split('')
})

const { isActive, pause, resume } = useTimeoutPoll(calculTime, 1000)

if (!isActive.value)
  resume()

nextTick(() => {
  gsap.set('.char', {
    '--hue': gsap.utils.distribute({
      base: 0,
      amount: 330,
    }),
  })
  gsap.to('.char', {
    '--weight': 700,
    '--saturation': 80,
    'ease': 'sine.inOut',
    'duration': 0.5,
    'stagger': {
      yoyo: true,
      repeat: -1,
      each: 0.15,
    },
  }).time(2)
  gsap.set('.clock-number-item', {
    '--hue': gsap.utils.distribute({
      base: 0,
      amount: 330,
    }),
  })
  gsap.to('.clock-number-item', {
    '--weight': 700,
    '--saturation': 80,
    'ease': 'sine.inOut',
    'duration': 0.5,
    'stagger': {
      yoyo: true,
      repeat: -1,
      each: 0.15,
    },
  }).time(2)
})

onBeforeUnmount(() => {
  if (isActive.value)
    pause()
})
</script>

<template>
  <div class="custom-wrapper p-10">
    <div class="container px-12 py-6 rounded-10px">
      <div class="w-36 h-36 flex items-center justify-center rounded-50% relative clock-wrap">
        <div class="clock-pointer absolute w-2 h-2 rounded-50% z-30" />
        <div class="clock-marker w-92% h-92% rounded-50% relative">
          <div class="clock-marker-item absolute rounded-0.4 w-2px h-2 left-50% top-4px translate-x--50%" />
          <div class="clock-marker-item absolute rounded-0.4 w-2px h-2 left-50% bottom-4px translate-x--50%" />
          <div class="clock-marker-item absolute rounded-0.4 h-2px w-2 top-50% left-4px translate-y--50%" />
          <div class="clock-marker-item absolute rounded-0.4 h-2px w-2 top-50% right-4px translate-y--50%" />
          <div class="clock-marker-inner w-60% h-60% absolute rounded-50% blur-1 left-20% top-20%" />
        </div>
        <!-- 时 -->
        <div class="clock-hour absolute origin-bottom rounded-.8 h-27.6% w-1.6 top-22.4% z-10" :style="{ rotate: `${hour * 30 + minute / 60 * 30}deg` }" />
        <!-- 分 -->
        <div class="clock-minute absolute origin-bottom rounded-.8 h-35% w-1.2 top-15% z-15" :style="{ rotate: `${minute * 6}deg` }" />
        <!-- 秒 -->
        <div class="clock-second absolute origin-bottom rounded-.8 h-43% w-.8 top-7% z-20" :style="{ rotate: `${second * 6}deg` }" />
      </div>
      <div class="clock-text text-6xl pt-6">
        <span class="char">
          H
        </span>
        <span class="char">
          e
        </span>
        <span class="char">
          l
        </span>
        <span class="char">
          l
        </span>
        <span class="char">
          o
        </span>
        <span class="char" />
        <span class="char">
          W
        </span>
        <span class="char">
          o
        </span>
        <span class="char">
          r
        </span>
        <span class="char">
          l
        </span>
        <span class="char">
          d
        </span>
      </div>
      <div class="clock-text text-6xl pt-6">
        <span
          v-for="(txt) in timeStampArr"
          :key="txt"
          class="clock-number-item inline-block w-auto text-center"
        >
          {{ txt }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
  .custom-wrapper {
    --primary-light: #8abdff;
    --primary: #6d5dfc;
    --primary-dark: #5b0eeb;

    --white: #FFFFFF;
    --greyLight-1: #E4EBF5;
    --greyLight-2: #c8d0e7;
    --greyLight-3: #bec8e4;
    --greyDark: #9baacf;

    $shadow: .3rem .3rem .6rem var(--greyLight-2), -.2rem -.2rem .5rem var(--white);
    $inner-shadow: inset .2rem .2rem .5rem var(--greyLight-2), inset -.2rem -.2rem .5rem var(--white);

    background-color: var(--greyLight-1);

    .container {
      box-shadow:.8rem .8rem 1.4rem var(--greyLight-2), -.2rem -.2rem 1.8rem var(--white);

      .clock-wrap {
        box-shadow: 0.3rem 0.3rem 0.6rem var(--greyLight-2), -0.2rem -0.2rem 0.5rem var(--white);
        .clock-pointer {
          background: var(--primary);
        }
        .clock-marker {
          box-shadow: inset 0.2rem 0.2rem 0.5rem var(--greyLight-2), inset -0.2rem -0.2rem 0.5rem var(--white);
          div {
            box-shadow: inset 1px 1px 1px var(--greyLight-2), inset -1px -1px 1px var(--white);
          }
        }
        .clock-hour {
          background: var(--greyDark);
        }
        .clock-minute {
          background-color: var(--greyLight-3);
        }

        .clock-second {
          background-color: var(--primary);
        }
      }
      .clock-text {
        span {
          font-variation-settings: 'wght' var(--weight, 100);
          color: hsl(var(--hue), calc(var(--saturation) * 1%), 65%);
        }
      }
    }
  }
</style>
