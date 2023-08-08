import 'uno.css'

// override style
import './styles/index.scss'

// element-ui
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import BlogApp from './components/BlogApp.vue'
import { withConfigProvider } from './composables/config/blog'

export const BlogTheme: Theme = {
  ...DefaultTheme,
  Layout: withConfigProvider(BlogApp),
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
  },
}

export * from './composables/config/index'

export default BlogTheme
