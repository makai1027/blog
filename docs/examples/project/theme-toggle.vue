<script lang='ts' setup>
import { nextTick, ref, watch } from 'vue'
import { ElSwitch } from 'element-plus'
import { isDark, toggleDark } from './dark'

const darkMode = ref(isDark.value)
watch(
  () => darkMode.value,
  () => {
    toggleDark()
  },
)

let resolveFn: (value: boolean | PromiseLike<boolean>) => void
function switchTheme(event: MouseEvent) {
  const isAppearanceTransition
    // @ts-expect-error
    = document.startViewTransition
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!isAppearanceTransition || !event) {
    resolveFn(true)
    return
  }
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  // @ts-expect-error: Transition API
  const transition = document.startViewTransition(async () => {
    resolveFn(true)
    await nextTick()
  })
  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 500,
        easing: 'ease-in',
        pseudoElement: isDark.value
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      },
    )
  })
}
function beforeChange(): Promise<boolean> {
  return new Promise((resolve) => {
    resolveFn = resolve
  })
}
</script>

<template>
  <div class="custom-wrapper" @click.stop="switchTheme">
    <ClientOnly>
      <ElSwitch
        v-model="darkMode"
        :before-change="beforeChange"
        active-text="Dark"
        inactive-text="Light"
      />
    </ClientOnly>
  </div>
</template>

<style lang='scss' scoped>

</style>
