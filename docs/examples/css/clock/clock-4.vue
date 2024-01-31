<script lang='ts' setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useTimeoutPoll } from '@vueuse/core'
import { ElRadioButton, ElRadioGroup } from 'element-plus'

const hour = ref(0)
const minute = ref(0)
const second = ref(0)
const audioRef = ref()
const toggleMuted = ref('muted')

function calculTime() {
  const date = new Date()
  hour.value = date.getHours()
  minute.value = date.getMinutes()
  second.value = date.getSeconds()
}

function mapNum(num: number): string {
  return num < 10 ? `0${num}` : `${num}`
}

function mapCls(numStr: string, idx: number, max: number) {
  const _num = Number(numStr)
  if (_num === idx) {
    return 'active'
  }
  else {
    if (_num > -1 && _num - 1 === idx)
      return 'before'
    if (_num === 0 && idx === max)
      return 'before'
  }
}

const timeStampArr = computed(() => {
  return `${mapNum(hour.value)}${mapNum(minute.value)}${mapNum(second.value)}`.split('')
})

const { isActive, pause, resume } = useTimeoutPoll(calculTime, 1000)

if (!isActive.value)
  resume()

onBeforeUnmount(() => {
  if (isActive.value)
    pause()
})

watch(() => toggleMuted.value, (val) => {
  nextTick(() => {
    audioRef.value.muted = val === 'muted'
  })
})

watch(() => second.value, () => {
  if (toggleMuted.value === 'muted')
    return
  nextTick(() => {
    if (audioRef.value) {
      setTimeout(() => {
        audioRef.value.play()
      }, 400)
    }
  })
})
</script>

<template>
  <div class="custom-wrapper relative h-64 flex items-center justify-center">
    <audio ref="audioRef" muted class="absolute top--100px left--100px">
      <source src="../../../assets/clock-audio.mp3" type="audio/mpeg">
    </audio>
    <ElRadioGroup v-model="toggleMuted" class="absolute z-10 left-4 top-4" size="small">
      <ElRadioButton label="muted" />
      <ElRadioButton label="unMuted" />
    </ElRadioGroup>
    <!-- 时 -->
    <div class="flip hour relative w-1ch h-1.5ch m-0.5px text-8xl text-white font-bold rounded-6px text-center mr-5px">
      <div
        v-for="idx in 10"
        :key="`hour-0-${idx}`"
        class="absolute left-0 top-0 w-full h-full"
        :data-index="idx - 1"
        :class="mapCls(timeStampArr[0], idx - 1, 2)"
      >
        <div class="up absolute left-0 top-0 w-full h-1/2 overflow-hidden origin-bottom z-1">
          <div class="shadow absolute w-full h-full z-2" />
          <div class="absolute left-0 bottom-0 z-5 w-full h-1px bg-#333" />
          <div class="inner absolute left-0 top-0 w-full h-200% text-#ccc rounded-6px bg-#333">
            {{ idx - 1 }}
          </div>
        </div>
        <div class="down absolute left-0 bottom-0 w-full h-1/2 overflow-hidden origin-top z-2">
          <div class="shadow absolute w-full h-full z-2" />
          <div class="inner absolute left-0 bottom-0 w-full h-200% text-#ccc rounded-6px bg-#333">
            {{ idx - 1 }}
          </div>
        </div>
      </div>
    </div>

    <div class="flip hour relative w-1ch h-1.5ch m-0.5px text-8xl text-white font-bold rounded-6px text-center mr-20px">
      <div
        v-for="idx in 10"
        :key="`hour-0-${idx}`"
        class="absolute left-0 top-0 w-full h-full"
        :data-index="idx - 1"
        :class="mapCls(timeStampArr[1], idx - 1, 9)"
      >
        <div class="up absolute left-0 top-0 w-full h-1/2 overflow-hidden origin-bottom z-1">
          <div class="shadow absolute w-full h-full z-2" />
          <div class="absolute left-0 bottom-0 z-5 w-full h-1px bg-#333" />
          <div class="inner absolute left-0 top-0 w-full h-200% text-#ccc rounded-6px bg-#333">
            {{ idx - 1 }}
          </div>
        </div>
        <div class="down absolute left-0 bottom-0 w-full h-1/2 overflow-hidden origin-top z-2">
          <div class="shadow absolute w-full h-full z-2" />
          <div class="inner absolute left-0 bottom-0 w-full h-200% text-#ccc rounded-6px bg-#333">
            {{ idx - 1 }}
          </div>
        </div>
      </div>
    </div>

    <!-- 分 -->
    <div class="flip hour relative w-1ch h-1.5ch m-0.5px text-8xl text-white font-bold rounded-6px text-center mr-5px">
      <div
        v-for="idx in 10"
        :key="`hour-0-${idx}`"
        class="absolute left-0 top-0 w-full h-full"
        :data-index="idx - 1"
        :class="mapCls(timeStampArr[2], idx - 1, 5)"
      >
        <div class="up absolute left-0 top-0 w-full h-1/2 overflow-hidden origin-bottom z-1">
          <div class="shadow absolute w-full h-full z-2" />
          <div class="absolute left-0 bottom-0 z-5 w-full h-1px bg-#333" />
          <div class="inner absolute left-0 top-0 w-full h-200% text-#ccc rounded-6px bg-#333">
            {{ idx - 1 }}
          </div>
        </div>
        <div class="down absolute left-0 bottom-0 w-full h-1/2 overflow-hidden origin-top z-2">
          <div class="shadow absolute w-full h-full z-2" />
          <div class="inner absolute left-0 bottom-0 w-full h-200% text-#ccc rounded-6px bg-#333">
            {{ idx - 1 }}
          </div>
        </div>
      </div>
    </div>

    <div class="flip hour relative w-1ch h-1.5ch m-0.5px text-8xl text-white font-bold rounded-6px text-center mr-20px">
      <div
        v-for="idx in 10"
        :key="`hour-0-${idx}`"
        class="absolute left-0 top-0 w-full h-full"
        :data-index="idx - 1"
        :class="mapCls(timeStampArr[3], idx - 1, 9)"
      >
        <div class="up absolute left-0 top-0 w-full h-1/2 overflow-hidden origin-bottom z-1">
          <div class="shadow absolute w-full h-full z-2" />
          <div class="absolute left-0 bottom-0 z-5 w-full h-1px bg-#333" />
          <div class="inner absolute left-0 top-0 w-full h-200% text-#ccc rounded-6px bg-#333">
            {{ idx - 1 }}
          </div>
        </div>
        <div class="down absolute left-0 bottom-0 w-full h-1/2 overflow-hidden origin-top z-2">
          <div class="shadow absolute w-full h-full z-2" />
          <div class="inner absolute left-0 bottom-0 w-full h-200% text-#ccc rounded-6px bg-#333">
            {{ idx - 1 }}
          </div>
        </div>
      </div>
    </div>

    <!-- 秒 -->
    <div class="flip hour relative w-1ch h-1.5ch m-0.5px text-8xl text-white font-bold rounded-6px text-center mr-5px">
      <div
        v-for="idx in 10"
        :key="`hour-0-${idx}`"
        class="absolute left-0 top-0 w-full h-full"
        :data-index="idx - 1"
        :class="mapCls(timeStampArr[4], idx - 1, 5)"
      >
        <div class="up absolute left-0 top-0 w-full h-1/2 overflow-hidden origin-bottom z-1">
          <div class="shadow absolute w-full h-full z-2" />
          <div class="absolute left-0 bottom-0 z-5 w-full h-1px bg-#333" />
          <div class="inner absolute left-0 top-0 w-full h-200% text-#ccc rounded-6px bg-#333">
            {{ idx - 1 }}
          </div>
        </div>
        <div class="down absolute left-0 bottom-0 w-full h-1/2 overflow-hidden origin-top z-2">
          <div class="shadow absolute w-full h-full z-2" />
          <div class="inner absolute left-0 bottom-0 w-full h-200% text-#ccc rounded-6px bg-#333">
            {{ idx - 1 }}
          </div>
        </div>
      </div>
    </div>

    <div class="flip hour relative w-1ch h-1.5ch m-0.5px text-8xl text-white font-bold rounded-6px text-center mr-20px">
      <div
        v-for="idx in 10"
        :key="`hour-0-${idx}`"
        class="absolute left-0 top-0 w-full h-full"
        :data-index="idx - 1"
        :class="mapCls(timeStampArr[5], idx - 1, 9)"
      >
        <div class="up absolute left-0 top-0 w-full h-1/2 overflow-hidden origin-bottom z-1">
          <div class="shadow absolute w-full h-full z-2" />
          <div class="absolute left-0 bottom-0 z-5 w-full h-1px bg-#333" />
          <div class="inner absolute left-0 top-0 w-full h-200% text-#ccc rounded-6px bg-#333">
            {{ idx - 1 }}
          </div>
        </div>
        <div class="down absolute left-0 bottom-0 w-full h-1/2 overflow-hidden origin-top z-2">
          <div class="shadow absolute w-full h-full z-2" />
          <div class="inner absolute left-0 bottom-0 w-full h-200% text-#ccc rounded-6px bg-#333">
            {{ idx - 1 }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
  @keyframes show {
      0% {
          opacity: 0;
      }
      100% {
          opacity: 1;
      }
  }

  @keyframes hide {
      0% {
          opacity: 1;
      }
      100% {
          opacity: 0;
      }
  }

  @keyframes turn {
    0% {
        transform: rotateX(90deg);
    }
    100% {
        transform: rotateX(0deg);
    }
  }

  @keyframes turn2 {
    0% {
        transform: rotateX(0deg);
    }
    100% {
        transform: rotateX(-90deg);
    }
  }

  @keyframes asd {
    0% {
        z-index: 2;
    }
    5% {
        z-index: 4;
    }
    100% {
        z-index: 4;
    }
  }

  .custom-wrapper {
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.3);
    background: rgb(150,150,150);
    background: radial-gradient(ellipse at center, rgba(150,150,150, 1) 0%, rgba(89, 89, 89, 1) 100%);
    .flip {
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.7);
      .inner {
        text-shadow: 0 1px 2px #000;
      }
      .before {
        z-index: 3;
        .up {
          z-index: 2;
          animation: turn2 .5s linear both;
          .shadow {
            background: linear-gradient(to bottom, rgba(0, 0, 0, .1) 0%, rgba(0, 0, 0, 1) 100%);
            animation: show .5s linear both;
          }
        }
        .down {
          .shadow {
            background: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, .1) 100%);
            animation: show .5s linear both;
          }
        }
      }

      .active {
        animation: asd 0.5s 0.5s linear both;
        .down {
          z-index: 2;
          animation: turn 0.5s 0.5s linear both;
        }
        .up {
          .shadow {
            background: linear-gradient(to bottom, rgba(0, 0, 0, .1) 0%, rgba(0, 0, 0, 1) 100%);
            animation: hide .5s .3s linear both;
          }
        }
        .down {
          .shadow {
            background: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, .1) 100%);
            animation: hide .5s .3s linear both;
          }
        }
      }
    }
  }
</style>
