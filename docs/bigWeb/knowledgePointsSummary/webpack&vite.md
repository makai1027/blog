---
title: webpack/vite构建优化、热更新原理
date: 2024-03-12 18:20:00
author: 马凯
tags:
 - 前端
 - 性能优化
 - 知识点
categories:
 - 前端
sidebar:
  title: webpack/vite构建优化、热更新原理
isTimeLine: true
---


# webpack/vite构建优化、热更新原理


## webpack & vite热更新原理


### webpack 热更新原理

Webpack 的热更新（Hot Module Replacement, HMR）是一种极为有用的功能，它允许在应用运行时替换、添加或删除模块，而无需重新加载整个页面。这对于前端开发尤其有价值，因为它可以显著提高开发效率并保持应用状态。下面是 Webpack 热更新的基本原理：

1. **Webpack Dev Server**: 当使用 Webpack Dev Server 时，它启动了一个 HTTP 服务器用于服务网页和一个 WebSocket 服务器用于实现 HMR。当文件发生变化时，这些变化会被 Webpack 检测到。

2. **构建更新**：一旦发现文件更改，Webpack 会重新编译构建那个模块，并且生成一个所谓的 "更新块"（update chunk）。这个更新块包含了新版本的模块及其依赖关系的信息。

3. **通知客户端**：Webpack Dev Server 会通过 WebSocket 向客户端（浏览器）发送消息，告知有模块更新。

4. **下载更新**：浏览器接收到更新的消息后，会通过 HTTP 请求从服务器获取更新块。

5. **替换模块**：一旦最新的模块被下载，Webpack 的 HMR 运行时会根据这些新模块替换旧模块。这个过程发生在浏览器端。

6. **失败处理**：如果某个模块或其依赖不能被热替换，那么 HMR 将失败。在这种情况下，一个完整的页面刷新是必要的。

整个过程不需要页面刷新，可以保持应用的状态不变。对于一些复杂的模块更新逻辑，可能需要在模块代码中添加特定的 HMR 处理代码来确保正确的更新。例如，在 React 开发中，通常会结合 React Hot Loader 或其他类似的库来处理组件级别的热替换。

### vite 热更新原理
Vite 的热更新（Hot Module Replacement，简称 HMR）是一种非常有效的开发特性，它允许开发者在运行时更新应用中的模块，而无需进行完整的页面刷新。这不仅提高了开发效率，还保持了应用的状态。Vite 的热更新原理可以大致分为以下几个步骤：

1. **启动开发服务器**：当你启动 Vite 开发服务器时，它为你的项目中的每个模块提供了一个特殊的版本，这些版本都包含了可以与服务器通信的代码。

2. **模块替换**：当你修改并保存一个文件时，Vite 会检测到这一变化，并重新编译改变的模块。

3. **通知浏览器**：编译完成后，Vite 通过 WebSocket 连接向浏览器发送一个消息，通知它发生了变更。

4. **模块热替换**：浏览器收到通知后，会请求更新后的模块。Vite 利用 ES 模块的动态导入功能（`import()`）来获取更新后的模块。

5. **更新模块**：获取到更新后的模块后，Vite 会进行热替换。这个过程不需要刷新整个页面，只替换更改的部分。

6. **状态保持**：在理想情况下，应用的状态可以保持不变，因为只有更改的部分被重新加载了。

7. **回退到全页面刷新**：如果热替换失败，或者某些类型的更改无法通过 HMR 应用（如 HTML 和 CSS 的根级更改），Vite 会回退到执行完整的页面刷新来确保更改被正确加载。

Vite 的 HMR 功能依赖于现代浏览器对原生 ES 模块的支持，这使得它能够比基于传统打包器的 HMR 更快、更高效。此外，Vite 专门为 Vue 和 React 等现代前端框架提供了额外的 HMR 集成，以支持框架特有的热更新逻辑。


## webpack如何实现公共依赖作为项目单独打包

 你描述的场景可以使用 webpack 的 Module Federation 插件来实现。Module Federation 是 webpack 5 新增的一个插件,允许多个独立构建的应用程序共享模块,它支持在运行时动态加载模块,可以大大提高构建性能和代码复用率。

具体步骤如下:

1. **创建一个独立的公共依赖项目**

首先,创建一个新的项目,专门用于构建公共依赖模块。在该项目的 `webpack.config.js` 中,通过 `ModuleFederationPlugin` 插件来暴露需要共享的模块。

```js
const { ModuleFederationPlugin } = require('webpack').container

module.exports = {
  // ...
  plugins: [
    new ModuleFederationPlugin({
      name: 'commonDependencies',
      library: { type: 'var', name: 'commonDependencies' },
      filename: 'remoteEntry.js',
      exposes: {
        vue: 'vue', // 暴露 vue 模块
        // 可以暴露更多其他公共依赖
      },
    }),
  ],
}
```

这里我们将 `vue` 模块作为公共依赖进行暴露,并命名为 `commonDependencies`。构建后会生成一个 `remoteEntry.js` 文件,作为其他应用加载这些模块的入口。

2. **在各个项目中引入公共依赖**

接下来,在需要使用公共依赖的项目中,通过 `ModuleFederationPlugin` 插件的 `remotes` 配置来引入公共依赖。

```js
const { ModuleFederationPlugin } = require('webpack').container

module.exports = {
  // ...
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      remotes: {
        commonDependencies: 'commonDependencies@http://localhost:3000/remoteEntry.js',
      },
    }),
  ],
}
```

这里我们配置了一个远程模块 `commonDependencies`,指向了公共依赖项目构建出的 `remoteEntry.js` 文件。你可以使用一个 HTTP 服务器来提供这个文件,或者将它部署到一个 CDN 上。

3. **在项目代码中使用公共依赖**

最后,在项目的代码中就可以像使用本地模块一样使用远程导入的公共依赖了。

```js
import Vue from 'commonDependencies/vue'

new Vue({
  // ...
})
```

通过这种方式,你可以将公共依赖单独构建为一个独立的项目,并在需要使用时动态引入。这不仅可以实现代码复用,还可以提高构建性能,因为公共依赖只需构建一次,其他项目只需构建自己的代码。

需要注意的是,Module Federation 插件目前还处于实验阶段,在生产环境中使用时需要谨慎评估。同时,它也有一些已知的限制和缺陷,比如不支持 CSS 模块共享、不支持 ES6 模块导出等。但总的来说,它为解决模块共享和代码复用问题提供了一种全新的思路和方案。



## module federation 和 externals的区别是什么?

 你提出了一个很好的观点。是的,使用 webpack 的 Module Federation 插件和 externals 配置在解决公共依赖共享方面确实有一些相似之处,但它们也有一些重要的区别:

1. **加载方式不同**

externals 是告诉 webpack 不要打包某些模块,而是在运行时从外部获取这些依赖。这通常需要提前将依赖暴露为全局变量或通过别的方式手动引入。而 Module Federation 则是在构建时将依赖模块打包到一个单独的 chunk 中,在运行时通过网络动态加载这个 chunk,无需提前加载或暴露为全局变量。

2. **更新和部署**

使用 externals 时,如果公共依赖发生更新,你需要手动更新各个项目并重新部署。而使用 Module Federation,只需要重新构建并部署公共依赖项目,其他项目不需要改动就可以获取最新的依赖。

3. **支持情况**

externals 是 webpack 较早就支持的功能,而 Module Federation 是 webpack 5 新增的一个实验性插件,目前还存在一些已知限制。

4. **模块作用域**

externals 引入的模块会作用于全局作用域,可能会导致命名冲突等问题。而 Module Federation 加载的模块是作用于局部作用域的,降低了潜在的命名冲突风险。

5. **调试和错误处理**

使用 externals 时,难以在开发环境中对外部依赖进行调试和错误处理。Module Federation 则能够更好地支持开发者工具,提供更好的开发体验。

总的来说,Module Federation 是一个更加现代化、更加智能的解决方案,提供了比 externals 更加完善的模块共享和加载机制。当然,它目前还处于较早的实验阶段,在生产环境中使用时需要评估其局限性。而 externals 则是一个更加成熟、简单的方案,可以作为一种备选方案。具体选择哪种方式,需要根据项目的具体需求和约束条件来权衡。



## vite 和 angular-cli能否实现module federation功能？
 是的,Vite 和 Angular CLI 都可以实现 Module Federation 功能,但需要通过一些额外的配置或插件。

**Vite**

Vite 本身并不直接支持 Module Federation,但是你可以使用一个基于 Vite 的插件 [vite-plugin-federation](https://github.com/originerd/vite-plugin-federation) 来实现这个功能。该插件提供了在 Vite 中使用 Module Federation 的能力。

**Angular CLI**

对于 Angular CLI,你需要使用一个名为 [webpack-federation-toolbox](https://github.com/gmplemen/webpack-federation-toolbox) 的工具。它提供了在 Angular CLI 项目中启用 Module Federation 的脚本和工作流程。

使用 `webpack-federation-toolbox` 的步骤如下:

1. 安装 `webpack-federation-toolbox` 作为开发依赖
2. 在项目根目录下创建一个 `webpack.config.js` 文件
3. 运行 `webpack-federation-toolbox init` 命令初始化配置
4. 按照引导完成相关配置
5. 修改 `angular.json` 文件,将构建命令改为使用自定义的 `webpack.config.js`

完成这些步骤后,你就可以在 Angular CLI 项目中使用 Module Federation 功能了。

需要注意的是,Module Federation 目前仍然是一个实验性的功能,在生产环境中使用时需要格外小心。同时,由于 Vite 和 Angular CLI 本身并不直接支持该功能,所以需要使用第三方工具和插件,可能会存在一些潜在的问题和限制。在实际使用时,你需要根据具体情况进行评估和测试。

## module federation在vite 和 angular-cli中的实现方式？

 好的,我来提供一些具体的实现方法和代码示例:

**1. Vite 中使用 vite-plugin-federation**

首先需要安装 `vite-plugin-federation` 插件:

```bash
npm install vite-plugin-federation --save-dev
```

然后在 `vite.config.js` 中配置该插件:

```javascript
import { defineConfig } from 'vite'
import federation from 'vite-plugin-federation'

export default defineConfig({
  plugins: [
    federation({
      name: 'app1', // 应用名称
      remotes: {
        // 远程依赖映射
        shared: 'http://localhost:5000/assets/remoteEntry.js',
      },
      shared: ['vue'], // 需要共享的模块
    }),
  ],
})
```

在代码中使用远程模块:

```javascript
import { createApp } from 'vue'
import Vue from 'shared/vue' // 使用远程 Vue 模块

const app = createApp(...)
```

**2. Angular CLI 中使用 webpack-federation-toolbox**

安装 `webpack-federation-toolbox`:

```bash
npm install webpack-federation-toolbox --save-dev
```

创建 `webpack.config.js` 文件:

```javascript
const { shareAll, withModuleFederationPlugin } = require('webpack-federation-toolbox')

module.exports = withModuleFederationPlugin({
  name: 'app1',
  exposes: {
    './Module': './src/app/remote-entry/entry.module.ts',
  },
  shared: shareAll({
    ...require('webpack-federation-toolbox/shared-angular'),
  }),
})
```

修改 `angular.json` 文件:

```json
{
  "projects": {
    "app1": {
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "customWebpackConfig": {
              "path": "./webpack.config.js"
            }
          }
        }
      }
    }
  }
}
```

在另一个 Angular 应用中使用远程模块:

```typescript
// 远程入口模块
import('app1/Module').then((m) => {
  // 注册远程模块
  ...
})
```

这些只是最基本的示例,在实际使用中你可能还需要进行更多的配置和调整。同时需要注意,Module Federation 目前仍处于实验阶段,在生产环境使用时需要非常谨慎,并密切关注它的最新进展。
