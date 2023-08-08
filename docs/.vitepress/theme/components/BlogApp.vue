<script lang='ts' setup>
import Theme from 'vitepress/theme'
import { useBlogThemeMode } from '../composables/config/blog'
import ScoredTwice from './ScoredTwice.vue'
import BlogAlert from './BlogAlert.vue'
import BlogPopover from './BlogPopover.vue'
import BlogArticleAnalyze from './BlogArticleAnalyze.vue'
import BlogHomeBanner from './BlogHomeBanner.vue'
import BlogList from './BlogList.vue'
import BlogHomeInfo from './BlogHomeInfo.vue'
import BlogSidebar from './BlogSidebar.vue'

const isBlogTheme = useBlogThemeMode()
const { Layout } = Theme
</script>

<template>
  <ScoredTwice>
    <Layout>
      <template #layout-top>
        <BlogAlert />
        <BlogPopover />
      </template>

      <template #doc-before>
        <!-- 阅读时间分析 -->
        <ClientOnly>
          <BlogArticleAnalyze />
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
          <div class="content-wrapper flex">
            <div class="blog-list-wrapper flex-1">
              <BlogList />
            </div>
            <div class="blog-info-wrapper w-260px ml-20px">
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
        评论区
      </template>
    </Layout>
  </ScoredTwice>
</template>

<style lang='scss' scoped>
.Layout {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: scroll;
}
.home {
  padding-top: var(--vp-nav-height)
}
</style>

<!-- Full list of slots available in the default theme layout:

When layout: 'doc' (default) is enabled via frontmatter:
doc-top
doc-bottom
doc-footer-before
doc-before
doc-after
sidebar-nav-before
sidebar-nav-after
aside-top
aside-bottom
aside-outline-before
aside-outline-after
aside-ads-before
aside-ads-after
When layout: 'home' is enabled via frontmatter:
home-hero-before
home-hero-info
home-hero-image
home-hero-after
home-features-before
home-features-after
When layout: 'page' is enabled via frontmatter:
page-top
page-bottom
On not found (404) page:
not-found
Always:
layout-top
layout-bottom
nav-bar-title-before
nav-bar-title-after
nav-bar-content-before
nav-bar-content-after
nav-screen-content-before
nav-screen-content-after -->
