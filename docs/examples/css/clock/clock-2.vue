<script lang='ts' setup>
import { computed, onBeforeUnmount, ref } from 'vue'
import { useTimeoutPoll } from '@vueuse/core'

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

function mapNumCls(idx, num) {
  let str = ''
  switch (idx) {
    case 1:
      str = `w-15 border-t-black left-0 top--8px ${[1, 4].includes(num) ? 'opacity-0' : 'opacity-100'}`
      break
    case 2:
      str = `w-15 border-t-black left-0 top-15 ${[0, 1, 7].includes(num) ? 'opacity-0' : 'opacity-100'}`
      break
    case 3:
      str = `w-15 border-b-black left-0 bottom--8px ${[1, 4, 7].includes(num) ? 'opacity-0' : 'opacity-100'}`
      break
    case 4:
      str = `h-15 border-l-black left--4px top--4px ${[1, 2, 3].includes(num) ? 'opacity-0' : 'opacity-100'}`
      break
    case 5:
      str = `h-15 border-r-black right--4px top--4px ${[5, 6].includes(num) ? 'opacity-0' : 'opacity-100'}`
      break
    case 6:
      str = `h-15 border-l-black left--4px bottom--4px ${[1, 3, 4, 5, 7, 9].includes(num) ? 'opacity-0' : 'opacity-100'}`
      break
    case 7:
      str = `h-15 border-r-black right--4px bottom--4px ${[2].includes(num) ? 'opacity-0' : 'opacity-100'}`
      break
    default:
      break
  }
  return str
}

const timeStampArr = computed(() => {
  return `${mapNum(hour.value)}:${mapNum(minute.value)}:${mapNum(second.value)}`.split('')
})

const { isActive, pause, resume } = useTimeoutPoll(calculTime, 1000)

if (!isActive.value)
  resume()

console.log(timeStampArr.value)
onBeforeUnmount(() => {
  if (isActive.value)
    pause()
})
</script>

<template>
  <div class="custom-wrapper">
    <div class="number-content p-4">
      <div v-for="num in timeStampArr" :key="num" class="inline-block">
        <div v-if="Number(num) >= 0" class="number-box h-30 w-15 relative mr-4">
          <div
            v-for="i in 7"
            :key="`line-${i}`"
            class="line absolute border-solid border-transparent border-8 transition-opacity linear duration-500"
            :class="`line-${i} current-${num} ${mapNumCls(i, Number(num))}`"
          />
        </div>
        <div v-else class="number-box h-30 w-15 relative">
          <span class="point w-2 h-2 rounded-50% absolute left-6.5 bg-black top-9 animate-iteration-infinite animate-fade-in animate-linear" />
          <span class="point w-2 h-2 rounded-50% absolute left-6.5 bg-black top-19 animate-iteration-infinite animate-fade-in animate-linear" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>

</style>
