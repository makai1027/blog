import type { ThemeableImage } from '../composables/config'

const pattern
  = /[a-zA-Z0-9_\u0392-\u03C9\u00C0-\u00FF\u0600-\u06FF\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF\u3040-\u309F\uAC00-\uD7AF]+/g

export const r180 = Math.PI
export const r90 = Math.PI / 2
export const r60 = Math.PI / 3
export const r30 = Math.PI / 6
export const r15 = Math.PI / 12
export const r120 = Math.PI / 3 * 2
export const r360 = Math.PI * 2
export function initCanvas(canvas: HTMLCanvasElement, width = 400, height = 400, _dpi?: number) {
  const ctx = canvas.getContext('2d')!

  const dpr = window.devicePixelRatio || 1
  // @ts-expect-error
  const bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1

  const dpi = _dpi || dpr / bsr

  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  canvas.width = dpi * width
  canvas.height = dpi * height
  ctx.scale(dpi, dpi)

  return { ctx, dpi }
}
export function polar2cart(x = 0, y = 0, r = 0, theta = 0) {
  const dx = r * Math.cos(theta)
  const dy = r * Math.sin(theta)
  return [x + dx, y + dy]
}

export default function countWord(data: string) {
  const m = data.match(pattern)
  let count = 0
  if (!m)
    return 0

  for (let i = 0; i < m.length; i += 1) {
    if (m[i].charCodeAt(0) >= 0x4E00)
      count += m[i].length

    else
      count += 1
  }
  return count
}

export function formatDate(d: any, fmt = 'yyyy-MM-dd hh:mm:ss') {
  if (!(d instanceof Date))
    d = new Date(d)

  const o: any = {
    'M+': d.getMonth() + 1, // 月份
    'd+': d.getDate(), // 日
    'h+': d.getHours(), // 小时
    'm+': d.getMinutes(), // 分
    's+': d.getSeconds(), // 秒
    'q+': Math.floor((d.getMonth() + 3) / 3), // 季度
    'S': d.getMilliseconds(), // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      `${d.getFullYear()}`.substr(4 - RegExp.$1.length),
    )
  }

  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length),
      )
    }
  }
  return fmt
}

export function formatShowDate(date: Date | string) {
  const source = date ? +new Date(date) : +new Date()
  const now = +new Date()
  const diff = now - source
  const oneSeconds = 1000
  const oneMinute = oneSeconds * 60
  const oneHour = oneMinute * 60
  const oneDay = oneHour * 24
  const oneWeek = oneDay * 7
  if (diff < oneMinute)
    return `${Math.floor(diff / oneSeconds)}秒前`

  if (diff < oneHour)
    return `${Math.floor(diff / oneMinute)}分钟前`

  if (diff < oneDay)
    return `${Math.floor(diff / oneHour)}小时前`

  if (diff < oneWeek)
    return `${Math.floor(diff / oneDay)}天前`

  return formatDate(new Date(date), 'yyyy-MM-dd')
}
export function getImageUrl(
  image: ThemeableImage,
  isDarkMode: boolean,
): string {
  if (typeof image === 'string') {
    // 如果 ThemeableImage 类型为 string，则直接返回字符串
    return image
  }
  if ('src' in image) {
    // 如果 ThemeableImage 类型是一个对象，并且对象有 src 属性，则返回 src 属性对应的字符串
    return image.src
  }
  if ('light' in image && 'dark' in image) {
    // 如果 ThemeableImage 类型是一个对象，并且对象同时有 light 和 dark 属性，则根据 isDarkMode 返回对应的 URL
    return isDarkMode ? image.dark : image.light
  } // 如果 ThemeableImage 类型不是上述情况，则返回空字符串
  return ''
}

export function isCurrentWeek(date: Date, target?: Date) {
  const now = target || new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const oneDay = 1000 * 60 * 60 * 24
  const nowWeek = today.getDay()
  // 本周一的时间
  const startWeek = today.getTime() - (nowWeek === 0 ? 6 : nowWeek - 1) * oneDay
  return +date >= startWeek && +date <= startWeek + 7 * oneDay
}

export function chineseSearchOptimize(input: string) {
  return input
    .replace(/[\u4E00-\u9FA5]/g, ' $& ')
    .replace(/\s+/g, ' ')
    .trim()
}
