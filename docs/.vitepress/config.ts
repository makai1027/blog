import { defineConfig } from 'vitepress'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import { getAllFiles } from './theme/node'
import type { Theme } from './theme/composables/config/index'

export default defineConfig({
  ignoreDeadLinks: true,
  title: '遇见前端',
  description: '一个前端的学习笔记',
  lang: 'zh-cn',
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: '/favicon.ico', type: 'image/png' }],
    [
      'link',
      {
        rel: 'alternate icon',
        href: '/favicon.ico',
        type: 'image/png',
        sizes: '16x16',
      },
    ],
    ['meta', { name: 'author', content: '粥里有勺糖' }],
    ['link', { rel: 'mask-icon', href: '/favicon.ico', color: '#ffffff' }],
    [
      'link',
      { rel: 'apple-touch-icon', href: '/favicon.ico', sizes: '180x180' },
    ],
  ],
  lastUpdated: true,
  themeConfig: {
    blog: {
      pagesData: getAllFiles() as Theme.PageData[],
    },
    search: {
      provider: 'local',
      options: {
        appId: 'F919JCK8WY',
        apiKey: '3eca209ad24bdfc26db63382dd5e4490',
        indexName: 'sugarat_top',
        placeholder: '请输入要搜索的内容...',
      },
    },
    lastUpdatedText: '上次更新于',
    footer: {
      message:
        '<a target="_blank" href="https://beian.miit.gov.cn/">蜀ICP备19011724号</a>',
      copyright: '© 2018-present 粥里有勺糖 |  </a>',
    },
    logo: '/logo.jpg',
    editLink: {
      pattern:
        'https://github.com/ATQQ/sugar-blog/tree/master/packages/blogpress/:path',
      text: '去 GitHub 上编辑内容',
    },
    nav: [
      {
        text: '关于我',
        link: '/aboutme',
      },
      {
        text: '前端',
        items: [
          { text: 'JS基础', link: '/bigWeb/js/index' },
        ],
      },
      {
        text: '测试',
        items: [
          { text: '心得总结', link: '/api-examples' },
          { text: '校招考点汇总', link: '/index' },
          { text: '面经汇总', link: '/markdown-examples' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/makai1027' },
    ],
  },
  vite: {
    plugins: [
      Unocss({
        presets: [
          // 预设windicss
          presetUno(),
          // 通过class使用@iconify/json的所有图标，按需引用
          presetIcons({
            extraProperties: {
              'display': 'inline-block',
              'vertical-align': 'middle',
            },
          }),
          presetAttributify(),
        ],
      }),
      AutoImport({
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue', '@vueuse/core', 'vitepress'],
        dts: 'types/auto-imports.d.ts',
      }),
      Components({
        deep: true,
        resolvers: [
          // Auto register Element Plus components
          // 自动导入 Element Plus 组件
          ElementPlusResolver({
            importStyle: 'sass',
          }),
        ],
        dts: 'types/components.d.ts',
        extensions: ['vue'],
        dirs: ['src/components'],
      }),
    ],
  },
})
