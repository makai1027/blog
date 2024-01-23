<script lang='ts' setup>
import { getCurrentInstance, onMounted, ref } from 'vue'
import { useClipboard, useToggle } from '@vueuse/core'
import { ElCollapseTransition, ElDivider, ElIcon, ElMessage, ElTooltip } from 'element-plus'
import Example from './demo/vp-example.vue'
import SourceCode from './demo/vp-source-code.vue'

const props = withDefaults(defineProps<{
  source: string
  path: string
  rawSource: string
}>(), {
  source: '',
  path: '',
  rowSource: '',
})
const vm = getCurrentInstance()
const modules = vm?.appContext.app.config.globalProperties.modules
const sourceCodeRef = ref<HTMLButtonElement>()
const formatPathDemos = ref()
console.log(formatPathDemos.value)
const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false,
})

const [sourceVisible, toggleSourceVisible] = useToggle()

function onSourceVisibleKeydown(e: KeyboardEvent) {
  if (['Enter', 'Space'].includes(e.code)) {
    e.preventDefault()
    toggleSourceVisible(false)
    sourceCodeRef.value?.focus()
  }
}

async function copyCode() {
  if (!isSupported)
    ElMessage.error('复制失败')

  try {
    await copy()
    ElMessage.success('复制成功')
  }
  catch (e: any) {
    ElMessage.error(e.message)
  }
}

onMounted(async () => {
  const _file = Object.keys(modules).find(el => el.endsWith(props.path))
  if (_file) {
    const _component = await modules[_file]()
    formatPathDemos.value = _component.default
  }
})
</script>

<template>
  <div class="custom-wrapper">
    <div class="example">
      <Example :file="path" :demo="formatPathDemos" v-bind="$attrs" />

      <ElDivider class="!m-0" />

      <div class="op-btns">
        <ElTooltip
          content="复制"
          :show-arrow="false"
          :trigger="['hover', 'focus']"
          :trigger-keys="[]"
        >
          <ElIcon
            :size="16"
            aria-label="复制"
            class="op-btn"
            tabindex="0"
            role="button"
            @click="copyCode"
            @keydown.prevent.enter="copyCode"
            @keydown.prevent.space="copyCode"
          >
            <span class="i-ri-file-copy-line" />
          </ElIcon>
        </ElTooltip>
        <ElTooltip
          content="查看源代码"
          :show-arrow="false"
          :trigger="['hover', 'focus']"
          :trigger-keys="[]"
        >
          <button
            ref="sourceCodeRef"
            :aria-label="
              sourceVisible ? '隐藏源代码' : '查看源代码'
            "
            class="reset-btn el-icon op-btn"
            @click="toggleSourceVisible()"
          >
            <ElIcon :size="16">
              <span class="i-ri-code-line" />
            </ElIcon>
          </button>
        </ElTooltip>
      </div>

      <ElCollapseTransition>
        <SourceCode v-show="sourceVisible" :source="source" />
      </ElCollapseTransition>

      <Transition name="el-fade-in-linear">
        <div
          v-show="sourceVisible"
          class="example-float-control"
          tabindex="0"
          role="button"
          @click="toggleSourceVisible(false)"
          @keydown="onSourceVisibleKeydown"
        >
          <ElIcon :size="32">
            <span class="i-ep:caret-top" />
          </ElIcon>
          <span>隐藏源代码</span>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.example {
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);

  .op-btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 2.5rem;

    .el-icon {
      &:hover {
        color: var(--el-text-color);
      }
    }

    .op-btn {
      margin: 0 0.5rem;
      cursor: pointer;
      color: var(--el-text-color-secondary);
      transition: 0.2s;
    }
  }

  &-float-control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--el-border-color);
    height: 44px;
    box-sizing: border-box;
    background-color: var(--el-bg-color, #fff);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    color: var(--el-text-color-secondary);
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    span {
      font-size: 14px;
      margin-left: 10px;
    }

    &:hover {
      color: var(--el-color-primary);
    }
  }
}
</style>
