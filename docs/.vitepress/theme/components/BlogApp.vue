<script lang='ts' setup>
import Theme from 'vitepress/theme'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { computed, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import { useBlogThemeMode } from '../composables/config/blog'
import ScoredTwice from './ScoredTwice.vue'
import BlogAlert from './BlogAlert.vue'
import BlogArticleAnalyze from './BlogArticleAnalyze.vue'
import BlogHomeBanner from './BlogHomeBanner.vue'
import BlogList from './BlogList.vue'
import BlogHomeInfo from './BlogHomeInfo.vue'
import BlogSidebar from './BlogSidebar.vue'
import BlogImagePreview from './BlogImagePreview.vue'
import BlogComment from './BlogComment.vue'

const isBlogTheme = useBlogThemeMode()
const { Layout } = Theme
const { frontmatter } = useData()

const show = computed(() => {
  if (frontmatter.value.comment === false)
    return frontmatter.value.comment
  return true
})

const route = useRoute()
const showComment = ref(true)
watch(
  () => route.path,
  () => {
    if (!show.value)
      return
    showComment.value = false
    setTimeout(() => {
      showComment.value = true
    }, 200)
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <ElConfigProvider :locale="zhCn" :z-index="3000" :message="{ max: 5 }">
    <ScoredTwice />
    <Layout>
      <template #layout-top>
        <BlogAlert />
      </template>

      <template #doc-before>
        <!-- 阅读时间分析 -->
        <ClientOnly>
          <BlogArticleAnalyze />
          <BlogImagePreview />
        </ClientOnly>
      </template>

      <!-- <template #nav-bar-content-before>
        <BlogSearch />
      </template> -->
      <!-- 自定义首页 -->
      <template v-if="isBlogTheme" #home-hero-before>
        <div class="home p-20px my-0 mx-auto max-w-1200px">
          <!-- 页面顶部 -->
          <div class="py-60px">
            <BlogHomeBanner />
          </div>
          <div class="content-wrapper flex <md:flex-wrap">
            <div class="blog-list-wrapper flex-1">
              <BlogList />
            </div>
            <div class="blog-info-wrapper w-260px ml-20px <md:w-full <md:ml-0 <md:mt-20px">
              <BlogHomeInfo />
            </div>
          </div>
        </div>
      </template>

      <template v-if="isBlogTheme" #sidebar-nav-after>
        <BlogSidebar />
      </template>

      <!-- 评论区 -->
      <template #doc-after>
        <BlogComment v-if="showComment && show" />
      </template>
    </Layout>
  </ElConfigProvider>
</template>

<style lang='scss' scoped>
.Layout {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  z-index: 100;
}
.home {
  padding-top: var(--vp-nav-height)
}
</style>
