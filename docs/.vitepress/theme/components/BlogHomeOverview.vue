<script lang="ts" setup>
import { computed } from 'vue'
import { ElAvatar, ElButton, ElDivider } from 'element-plus'
import { isCurrentWeek } from '../utils'
import { useArticles } from '../composables/config/blog'
import avatarImg from '../../../assets/avatar.jpeg'

const docs = useArticles()
const notHiddenArticles = computed(() => {
  return docs.value.filter(v => !v.meta.hidden)
})
const blogUrl = computed(() => {
  const host = window.location.host
  if (host === 'http://www.soulferry.xyz/')
    return 'https://makai1027.github.io/'

  else
    return 'http://www.soulferry.xyz/'
})
const nowMonth = new Date().getMonth()
const nowYear = new Date().getFullYear()
const currentMonth = computed(() => {
  return notHiddenArticles.value.filter((v) => {
    const pubDate = new Date(v.meta?.date)
    return pubDate?.getMonth() === nowMonth && pubDate.getFullYear() === nowYear
  })
})

const currentWeek = computed(() => {
  return notHiddenArticles.value.filter((v) => {
    const pubDate = new Date(v.meta?.date)
    return isCurrentWeek(pubDate)
  })
})

function openGithub() {
  window.open('https://github.com/makai1027')
}
</script>

<template>
  <div class="card box-border position-relative mx-auto mb-10px w-full overflow-hidden p-10px rounded">
    <div class="text-center mb-10px">
      <ElAvatar :src="avatarImg" alt="作者头像" :size="80" shape="circle" />

      <p class="text-sm mb-2">
        前端笔记，用于记录相关经验。
      </p>
      <p class="text-sm mb-2">
        <span class="i-line-md:email primary" />
        <a class="ml-2" href="mailto:403756835@qq.com">403756835@qq.com</a>
      </p>
      <p class="text-sm mb-2">
        <span class="i-ic:round-wechat success" />
        <span class="ml-2">atob('U3ltYm9sOTFt')</span>
      </p>
      <p class="text-sm mb-2">
        <span class="i-line-md:home-md primary" />
        <a class="ml-2" :href="blogUrl">---博客地址---</a>
      </p>
    </div>
    <div class="w-full flex items-center ">
      <div class="flex flex-1 items-center flex-col justify-center mx-10px">
        <span class="text-lg">{{ notHiddenArticles.length }}</span>
        <span class="text-xs mt-6px label">博客文章</span>
      </div>
      <ElDivider direction="vertical" />
      <div class="flex flex-1 items-center flex-col justify-center mx-10px">
        <span class="text-lg">+{{ currentMonth?.length }}</span>
        <span class="text-xs mt-6px label">本月更新</span>
      </div>
      <ElDivider direction="vertical" />
      <div class="flex flex-1 items-center flex-col justify-center mx-10px">
        <span class="text-lg">+{{ currentWeek?.length }}</span>
        <span class="text-xs mt-6px label">本周更新</span>
      </div>
    </div>
    <ElButton size="small" type="primary" class="w-full mt-2" @click="openGithub">
      <template #icon>
        <span class="i-formkit:github" />
      </template>
      Follow me
    </ElButton>
  </div>
</template>

<style lang="scss" scoped>
.card {
  box-shadow: var(--box-shadow);
  transition: all 0.3s;
  background-color: rgba(var(--bg-gradient));

  &:hover {
    box-shadow: var(--box-shadow-hover);
  }
}
.primary {
  color: var(--el-color-primary);
}
.success {
  color: var(--el-color-success);
}
.label {
  color: var(--description-font-color);
}
</style>
