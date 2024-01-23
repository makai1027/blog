import fs from 'node:fs'
import path from 'node:path'
import { getHighlighter } from 'shiki'

// 同步定义shiki的codeToHtml
let codeToHtml: any = null;
(async () => {
  const res = await getHighlighter({
    theme: 'material-theme-palenight',
  })
  codeToHtml = res.codeToHtml
})()

export default (md: any) => {
  const render = md.render

  md.render = (tokens, pageInfo) => {
    const regx = /:::demo((.|\r|\n)*?):::/gm
    let result = render.call(md, tokens, pageInfo) // md转之后的text
    const matchRes = result.match(regx)
    if (matchRes && matchRes.length) {
      matchRes.forEach((demoStr) => {
        const fileUrl = demoStr.match(/^:::demo((.|\n)*):::$/m)[1]?.replace(/\s/g, '')
        if (fileUrl) {
          const source = fs.readFileSync(path.resolve('./docs/.vitepress', 'examples', `${fileUrl}`), 'utf-8')

          const htmlSource = codeToHtml(source, { lang: 'vue' })
          const _newDemoStr = `<BlogDemoPreview source="${encodeURIComponent(
              htmlSource,
            )}" path="${fileUrl}" raw-source="${encodeURIComponent(
              source,
            )}"/>`
          result = result.replace(demoStr, _newDemoStr)
        }
      })
    }

    return result
  }
}
