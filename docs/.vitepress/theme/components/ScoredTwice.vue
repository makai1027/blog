<script lang='ts' setup name="Plum">
import { useRafFn } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'
import { initCanvas, polar2cart, r15, r180, r90 } from '../utils'

const cvsRef = ref<HTMLCanvasElement | null>(null)
const { random } = Math

const f = {
  start: () => {},
}

const init = ref(5)
const len = ref(6)
const stopped = ref(false)

watch([init, len], () => f.start())

onMounted(async () => {
  const canvas = cvsRef.value!
  const { ctx } = initCanvas(canvas, window.innerWidth, window.innerHeight)
  const { width, height } = canvas
  let steps: ((...args: any) => void)[] = []
  let prevSteps: ((...args: any) => void)[] = []

  const step = (x: number, y: number, rad: number, iterations = 0) => {
    const length = random() * len.value
    iterations += 1
    const [nx, ny] = polar2cart(x, y, length, rad)

    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(nx, ny)
    ctx.stroke()

    const rad1 = rad + random() * r15
    const rad2 = rad - random() * r15

    if (nx < -100 || nx > width + 100 || ny < -100 || ny > height + 100)
      return

    const _w = iterations <= init.value ? 0.8 : 0.5
    if (random() < _w) {
      steps.push(() => step(nx, ny, rad1, iterations))
      steps.push(() => step(nx, ny, rad2, iterations))
    }
  }

  const frame = () => {
    prevSteps = steps
    steps = []

    if (!prevSteps.length) {
      controls.pause()
      stopped.value = true
    }
    prevSteps.forEach(i => i())
  }

  const controls = useRafFn(frame, { immediate: false })
  const _r = () => random() * 0.6 + 0.2
  f.start = () => {
    controls.pause()
    ctx.clearRect(0, 0, width, height)
    ctx.lineWidth = 1
    ctx.strokeStyle = '#88888825'
    prevSteps = []
    steps = [
      () => step(_r() * width, -5, r90),
      () => step(_r() * width, height + 5, -r90),
      () => step(-5, _r() * height, 0),
      () => step(width + 5, _r() * height, r180),
    ]
    controls.resume()
    stopped.value = false
  }

  f.start()
})
</script>

<template>
  <div class="custom-wrapper">
    <canvas ref="cvsRef" style="width: 100%;height: 100%;" />
    <slot />
  </div>
</template>

<style lang='scss' scoped>
    .custom-wrapper {
        position: relative;
        height: 100vh;
        width: 100vw;
        overflow: hidden;
    }
</style>
