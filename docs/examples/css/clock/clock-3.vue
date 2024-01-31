<script lang='ts' setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { useTimeoutPoll } from '@vueuse/core'

import { ElRadioButton, ElRadioGroup } from 'element-plus'

const hour = ref(0)
const minute = ref(0)
const second = ref(0)
const toggleHidden = ref('unset')

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
  return `${mapNum(hour.value)}${mapNum(minute.value)}${mapNum(second.value)}`.split('').map(el => Number(el))
})

const { isActive, pause, resume } = useTimeoutPoll(calculTime, 1000)

if (!isActive.value)
  resume()

onBeforeUnmount(() => {
  if (isActive.value)
    pause()
})
</script>

<template>
  <div class="custom-wrapper bg-#222222 py-16 relative overflow-hidden">
    <ElRadioGroup v-model="toggleHidden" class="absolute z-10 left-4 top-4" size="small">
      <ElRadioButton label="unset" />
      <ElRadioButton label="hidden" />
    </ElRadioGroup>
    <div class="clock w-full h-6em flex items-center justify-center text-4vmin font-mono preserve-3d perspect-500 text-#F1F1F1 tracking-0.1em font-bold" :style="{ overflow: toggleHidden }">
      <!-- 时 -->
      <span class="clock-item relative w-1ch h-1ch inline-block preserve-3d mx-0.2ch transition-transform duration-300 ease" :style="{ '--index': `${timeStampArr[0]}` }">
        <span v-for="i in 10" :key="`items-0-${i}`" class="absolute left-0 top-0 w-1ch h-1ch inline-block" :style="{ transform: `rotateX(${(i - 1) * 36}deg) translateZ(2.5em)` }">{{ i - 1 }}</span>
      </span>
      <span class="clock-item relative w-1ch h-1ch inline-block preserve-3d mx-0.2ch transition-transform duration-300 ease" :style="{ '--index': `${timeStampArr[1]}` }">
        <span v-for="i in 10" :key="`items-0-${i}`" class="absolute left-0 top-0 w-1ch h-1ch inline-block" :style="{ transform: `rotateX(${(i - 1) * 36}deg) translateZ(2.5em)` }">{{ i - 1 }}</span>
      </span>
      <!-- 冒号 -->
      <div class="relative w-1ch h-1ch mx-0.2ch inline-block opacity-80 text-center translate-z-2.5em">
        :
      </div>
      <!-- 分 -->
      <span class="clock-item relative w-1ch h-1ch inline-block preserve-3d mx-0.2ch transition-transform duration-300 ease" :style="{ '--index': `${timeStampArr[2]}` }">
        <span v-for="i in 10" :key="`items-0-${i}`" class="absolute left-0 top-0 w-1ch h-1ch inline-block" :style="{ transform: `rotateX(${(i - 1) * 36}deg) translateZ(2.5em)` }">{{ i - 1 }}</span>
      </span>
      <span class="clock-item relative w-1ch h-1ch inline-block preserve-3d mx-0.2ch transition-transform duration-300 ease" :style="{ '--index': `${timeStampArr[3]}` }">
        <span v-for="i in 10" :key="`items-0-${i}`" class="absolute left-0 top-0 w-1ch h-1ch inline-block" :style="{ transform: `rotateX(${(i - 1) * 36}deg) translateZ(2.5em)` }">{{ i - 1 }}</span>
      </span>
      <!-- 冒号 -->
      <div class="relative w-1ch h-1ch mx-0.2ch inline-block opacity-80 text-center translate-z-2.5em">
        :
      </div>
      <!-- 秒 -->
      <span class="clock-item relative w-1ch h-1ch inline-block preserve-3d mx-0.2ch transition-transform duration-300 ease" :style="{ '--index': `${timeStampArr[4]}` }">
        <span v-for="i in 10" :key="`items-0-${i}`" class="absolute left-0 top-0 w-1ch h-1ch inline-block" :style="{ transform: `rotateX(${(i - 1) * 36}deg) translateZ(2.5em)` }">{{ i - 1 }}</span>
      </span>
      <span class="clock-item relative w-1ch h-1ch inline-block preserve-3d mx-0.2ch transition-transform duration-300 ease" :style="{ '--index': `${timeStampArr[5]}` }">
        <span v-for="i in 10" :key="`items-0-${i}`" class="absolute left-0 top-0 w-1ch h-1ch inline-block" :style="{ transform: `rotateX(${(i - 1) * 36}deg) translateZ(2.5em)` }">{{ i - 1 }}</span>
      </span>
    </div>
  </div>
</template>

<style lang='scss' scoped>
  .custom-wrapper{
    .clock {
      background: rgba(34, 34, 34, 0.8);
      &::before {
        content: '';
        // display: none;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, rgba(34, 34, 34, 0.9) 20%, transparent calc(50% - .4ch), transparent calc(50% + .4ch), rgba(34, 34, 34, 0.9) 80%);
        transform: translateZ(2.6em);
      }
      .clock-item {
        --index: 0;
        transform: rotateX(calc(-1turn * (var(--index) / 10)));
      }
    }

  }
</style>
