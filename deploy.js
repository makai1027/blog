import shell from 'shelljs'

shell.cd('/Users/makai/Documents/project/私人项目/makai.github.io')

shell.ls().forEach((file) => {
  shell.rm('-rf', file)
})

shell.cp('-R', '/Users/makai/Documents/project/私人项目/makai.github.iox/docs/.vitepress/dist/*', '/Users/makai/Documents/project/私人项目/makai.github.io')

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git')
  shell.exit(1)
}

if (shell.exec(`
git add .
git commit -m 'feat: 新增文章-此为deploy脚本自动提交'
git push
`).code !== 0) {
  shell.echo('Error: Git commit failed')
  shell.exit(1)
}
