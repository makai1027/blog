import { defineConfig } from 'vitepress'
import Unocss from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { getAllFiles } from './theme/node'
import type { Theme } from './theme/composables/config/index'

export default withMermaid(defineConfig({
  ignoreDeadLinks: true,
  title: '遇见前端',
  description: '一个前端的学习笔记',
  lang: 'zh-CN',
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
    ['meta', { name: 'author', content: '遇见前端' }],
    ['meta', { name: 'keywords', content: 'Js,ts,JavaScript,Typescript,vitepress,node,前端,分享,博客,技术经验' }],
    ['meta', { name: 'description', content: '遇见前端一个写博客的仓库，仓库包含面试遇到的问题，项目总结，技术难点记录，知识点记录' }],
    ['link', { rel: 'mask-icon', href: '/favicon.ico', color: '#ffffff' }],
    [
      'link',
      { rel: 'apple-touch-icon', href: '/favicon.ico', sizes: '180x180' },
    ],
  ],
  lastUpdated: true,
  themeConfig: {
    outlineTitle: '本页目录',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回页面顶部',
    blog: {
      pagesData: getAllFiles() as Theme.PageData[],
    },
    search: {
      provider: 'local',
    },
    lastUpdatedText: '上次更新于',
    footer: {
      message:
      '<a target="_blank" href="https://beian.miit.gov.cn/">皖ICP备16024556号-3</a>',
      copyright: '© 2018-present | <a href="http://www.soulferry.xyz">遇见前端。 </a>',
    },
    logo: '/logo.jpg',
    editLink: {
      pattern:
        'https://github.com/makai1027/blog/tree/main/docs/:path',
      text: '去 GitHub 上编辑内容',
    },
    sidebar: [{
      text: '',
      items: [],
    }],
    nav: [
      {
        text: '关于我',
        link: '/about',
      },
      {
        text: '前端',
        items: [
          { text: 'JS基础', link: '/bigWeb/js/index' },
        ],
      },
      {
        text: '技术随笔',
        link: '/other/index',
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/makai1027' },
    ],
  },
  vite: {
    resolve: {
      alias: {
        mermaid: 'mermaid/dist/mermaid.esm.mjs',
      },
    },
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
    ],
  },
}))
