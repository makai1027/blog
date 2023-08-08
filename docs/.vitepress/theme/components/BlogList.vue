<script lang='ts' setup>
import { useData, useRouter } from 'vitepress'
import { useBrowserLocation } from '@vueuse/core'
import { computed, watch } from 'vue'
import { ElPagination } from 'element-plus'
import type { Theme } from '../composables/config'
import {
  useActiveTag,
  useArticles,
  useBlogConfig,
  useCurrentPageNum,
} from '../composables/config/blog'
import BlogItem from './BlogItem.vue'

// 格式化 获取文档信息
const { theme, frontmatter } = useData<Theme.Config>()
// 作者
const globalAuthor = computed(() => theme.value.blog?.author || '')
const docs = useArticles()

const activeTag = useActiveTag()

const activeTagLabel = computed(() => activeTag.value.label)

// 获取文章列表
const wikiList = computed(() => {
  const topList = docs.value.filter(v => !v.meta.hidden && !!v.meta.top)

  topList.sort((a, b) => {
    const atop = a.meta.top
    const btop = b.meta.top
    return Number(atop) - Number(btop)
  })
  const data = docs.value.filter(
    v => v.meta.date && v.meta.title && !v.meta.top && !v.meta.hidden,
  )
  data.sort((a, b) => +new Date(b.meta.date) - +new Date(a.meta.date))
  return topList.concat(data)
})

// 列表过滤总长度
const filterData = computed(() => {
  if (!activeTagLabel.value)
    return wikiList.value
  return wikiList.value.filter(v =>
    v.meta?.tag?.includes(activeTagLabel.value),
  )
})
const { home } = useBlogConfig()
const pageSize = computed(
  () => frontmatter.value.blog?.pageSize || home?.pageSize || 6,
)

// 当前页码
const currentPage = useCurrentPageNum()
// 当前可显示的列表
const currentWikiData = computed(() => {
  const startIdx = (currentPage.value - 1) * pageSize.value
  const endIdx = startIdx + pageSize.value
  return filterData.value.slice(startIdx, endIdx)
})
const router = useRouter()
const location = useBrowserLocation()
const queryPageNumKey = 'pageNum'
function handleUpdatePageNum(current: number) {
  if (currentPage.value === current)
    return

  currentPage.value = current
  const { searchParams } = new URL(window.location.href!)
  searchParams.delete(queryPageNumKey)
  searchParams.append(queryPageNumKey, String(current))
  router.go(
    `${location.value.origin}${router.route.path}?${searchParams.toString()}`,
  )
}

watch(
  location,
  () => {
    if (location.value.href) {
      const { searchParams } = new URL(location.value.href)
      if (searchParams.has(queryPageNumKey))
        currentPage.value = Number(searchParams.get(queryPageNumKey))
      else
        currentPage.value = 1
    }
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <!-- 不通过文档查询搜索 -->
  <ul data-pagefind-ignore="all">
    <li v-for="v in currentWikiData" :key="v.route">
      <BlogItem
        :route="v.route"
        :title="v.meta.title"
        :description="v.meta.description"
        :description-h-t-m-l="v.meta.descriptionHTML"
        :date="v.meta.date"
        :tag="v.meta.tag"
        :cover="v.meta.cover"
        :author="v.meta.author || globalAuthor"
        :pin="v.meta.top"
      />
    </li>
  </ul>
  <!-- 隐藏不友好ssr -->
  <ClientOnly>
    <ElPagination
      v-if="wikiList.length >= pageSize"
      small
      background
      :default-current-page="1"
      :page-size="currentPage"
      :total="filterData.length"
      layout="prev, pager, next, jumper"
      @update:current-page="handleUpdatePageNum"
    />
  </ClientOnly>
</template>

<style lang='less' scoped>

</style>
