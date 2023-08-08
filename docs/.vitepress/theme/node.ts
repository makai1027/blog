import path from 'node:path'
import fs from 'node:fs'
import { spawnSync } from 'node:child_process'
import glob from 'fast-glob'
import matter from 'gray-matter'
import { formatDate } from './utils/index'
import type { Theme } from './composables/config/index'

function getTextSummary(text: string, count = 100) {
  return (
    clearMatterContent(text)
      .match(/^# ([\s\S]+)/m)?.[1]
      // 除去标题
      ?.replace(/#/g, '')
      // 除去图片
      ?.replace(/!\[.*?\]\(.*?\)/g, '')
      // 除去链接
      ?.replace(/\[(.*?)\]\(.*?\)/g, '$1')
      // 除去加粗
      ?.replace(/\*\*(.*?)\*\*/g, '$1')
      ?.split('\n')
      ?.filter(v => !!v)
      ?.slice(1)
      ?.join('\n')
      ?.replace(/>(.*)/, '')
      ?.slice(0, count)
  )
}

export function getAllFiles() {
  const srcDir = '.'
  const files = glob.sync(`${srcDir}/**/*.md`, { ignore: ['node_modules'] })
  const data = files.map((file) => {
    let route = file.replace('.md', '')
    if (route.startsWith('./')) {
      route = route.replace(
        new RegExp(
                `^\\.\\/${path
                  .join(srcDir, '/')
                  .replace(new RegExp(`\\${path.sep}`, 'g'), '/')}`,
        ),
        '',
      )
    }
    else {
      route = route.replace(
        new RegExp(
              `^${path
                .join(srcDir, '/')
                .replace(new RegExp(`\\${path.sep}`, 'g'), '/')}`,
        ),
        '',
      )
    }
    const fileContent = fs.readFileSync(file, 'utf-8')

    // TODO: 支持JSON
    const meta: Partial<Theme.PageMeta> = {
      ...matter(fileContent).data,
    }

    if (!meta.title)
      meta.title = getDefaultTitle(fileContent)

    if (!meta.date)
      meta.date = getFileBirthTime(file)
    else
      meta.date = formatDate(new Date(`${new Date(meta.date).toUTCString()}+8`))

    meta.categories = typeof meta.categories === 'string' ? [meta.categories] : meta.categories
    meta.tags = typeof meta.tags === 'string' ? [meta.tags] : meta.tags

    meta.tag = (meta.tag || []).concat([
      ...new Set([...(meta.categories || []), ...(meta.tags || [])]),
    ])

    const wordCount = 100
    meta.description = meta.description || getTextSummary(fileContent, wordCount)

    // 封面
    meta.cover = meta.cover
    ?? (fileContent.match(/[!]\[.*?\]\((https:\/\/.+)\)/)?.[1] || '')

    // 是否发布
    if (meta.publish === false) {
      meta.hidden = true
      meta.recommend = false
    }

    return {
      route: `/${route.replace('docs/', '')}`,
      meta,
    }
  })

  return data
}

export function clearMatterContent(content: string) {
  let first___: unknown
  let second___: unknown

  const lines = content.split('\n').reduce<string[]>((pre, line) => {
    // 移除开头的空白行
    if (!line.trim() && pre.length === 0)
      return pre

    if (line.trim() === '---') {
      if (first___ === undefined)
        first___ = pre.length

      else if (second___ === undefined)
        second___ = pre.length
    }
    pre.push(line)
    return pre
  }, [])
  return (
    lines
    // 剔除---之间的内容
      .slice((second___ as number) || 0)
      .join('\n')
  )
}

export function getFileBirthTime(url: string) {
  let date = new Date()

  try {
    // 参考 vitepress 中的 getGitTimestamp 实现
    const infoStr = spawnSync('git', ['log', '-1', '--pretty="%ci"', url])
      .stdout?.toString()
      .replace(/["']/g, '')
      .trim()
    if (infoStr)
      date = new Date(infoStr)
  }
  catch (error) {
    return formatDate(date)
  }

  return formatDate(date)
}

export function getDefaultTitle(content: string) {
  const title
      = clearMatterContent(content)
        .split('\n')
        ?.find((str) => {
          return str.startsWith('# ')
        })
        ?.slice(2)
        .replace(/^\s+|\s+$/g, '') || ''
  return title
}
