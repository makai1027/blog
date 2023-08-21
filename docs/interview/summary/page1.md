---
sidebar:
 title: 浏览器为什么要用es5,es6转es5的过程,构建包的引用关系
 step: 10
isTimeLine: true
title: 浏览器为什么要用es5,es6转es5的过程,构建包的引用关系
date: 2023-08-17
author: 马凯
tags:
 - 面试
 - 浏览器
categories:
 - 面试
---

# 浏览器为什么要用es5,es6转es5的过程,构建包的引用关系

## 浏览器为什么需要项目构建时将es6转换为es5？

答： 为了浏览器兼容，以及为了在 node.js 环境可以顺畅运行应用程序。

ES6作为JS的新规范，加入了很多新的语法和API，而市面上的浏览器并没有全部兼容，所以需要将ES6语法代码转为ES5的代码。

现代浏览器对ES6新特性支持度不高，所以要想在浏览器中直接使用ES6的新特性就得借助别的工具来实现。

在 node.js 环境中，node 对 ES6 的支持一直被诟病，到了 13 版本之后，才出了模块模式（在 package.json 中增加一句：“type”: “module”），但有些库仍然不支持 ES6 语法。因此，如果你的 node.js 程序遇到不认识 ES6 语法的时候，请使用 Babel 转码一下也许就能解决问题。


## es6在构建时转化为es5的过程

es6转为es5，无论是使用的何种构建方式，最终都是通过bable-loader，将代码进行转译后再写入到指定的目录中。

**无论在任何构建器中，都会存在plugin和loader，plugin就为了给构建器提供外部方法，loader则是为构建器提供翻译工具，让构建器能够读懂不同类型的代码，从而调用plugin提供的方法以及构建器的自身方法对代码进行转译。**


## 项目构建后都有哪些类型文件或者文件夹？

答：项目构建后产生的文件会存放在构建器配置的outdir目录中，通常不配置则默认为dist。产生的文件类型分为assets、vander、chunk、favico、index.html、boundle、module等

首先说的一个概念就是浏览器端使用的是require的方式进行资源的加载。

### 那么webpack 异步加载分包如何实现？

该部分参考：[由浅至深了解webpack异步加载背后的原理](https://zhuanlan.zhihu.com/p/100459699)

## 组件化和模块化封装的原则？

### 概念

* 组件化：如果一个功能多次使用，那么我们将其进行封装，在需要的时候进行调用
* 模块化：是指将一组功能进行隔离，使其可以独立运行独立管理，例如vue的页面，vue组件，可以单独作为路由页面，也可以被引用作为组件

### 组件化、模块化的原则

* 功能单一
* 可配置性强
* 可复用性
* 可维护


### 模块化和组件化的优势

* 减少代码重复开发，提高效率
* 版本管理可控制
* 可维护性强


## es6的import、export和es5中的require、module.exports的区别？

### import和export

es6的引入方式
```ts
export const a = 111

export const foo = function () {
  console.log('sss')
}

export default {
  a, foo
}
```

```ts
// 仅引用a
// import { a } from './utils'

// 引用默认导出赋值为Utils，此时utils包含a和foo，同时引入一个a
// import Utils, { a } from './utils'

// 导出所有的方法并赋值为Utils
// import * as Utils from './utils'
```


### require，module.exports

```js
function foo() {}

var a = ''

module.exports {
    foo: foo,
    a:a
}

```

```js
// utils内包含foo和a
const Utils = require('./utils')
```

### 构建后


