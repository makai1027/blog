import 'uno.css'

// override style
import './styles/index.scss'
import 'gitalk/dist/gitalk.css'

// element-ui
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import BlogApp from './components/BlogApp.vue'
import BlogDemoPreview from './components/BlogDemoPreview.vue'
import { withConfigProvider } from './composables/config/blog'

// @ts-expect-error
const modules = import.meta.glob('../../examples/**/*.vue')

export const BlogTheme: Theme = {
  ...DefaultTheme,
  Layout: withConfigProvider(BlogApp),
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.config.globalProperties.modules = modules
    ctx.app.component('BlogDemoPreview', BlogDemoPreview)
  },
}

export * from './composables/config/index'

export default BlogTheme
