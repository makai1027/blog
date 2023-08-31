---
sidebar:
 title: js有哪些声明方式？他们的区别是什么？
 step: 10
isTimeLine: true
title: js有哪些声明方式？他们的区别是什么？
date: 2020-10-16
author: 马凯
tags:
 - 前端
 - JavaScript
categories:
 - 前端
---

# js有哪些声明方式？他们的区别是什么？

变量声明在任何语言中都会有，在JavaScript中声明方式有var、let、const、import、class、function，以下简单介绍一下他们的区别

## 声明方式类型

* var
* let
* const
* function  
* class
* import

## var声明

var声明变量，可以同时初始化一个值，**var的生命是一个全局作用域的生命方式，也被函数作用域限制。**

**特点**
1. 会造成声明提前
2. 全局作用域
3. 可以重复声明
4. 容易造成变量污染

**简单声明示例**
```ts
// var a

// var b = 1, c = 1

// var d = 10
```

**全局作用域示例**
```js
// eslint-disable-next-line no-var
var a

Foo()

function Foo() {
  // eslint-disable-next-line no-var
  var a = b = 2
}

console.log(a) // undefined
console.log(b) // 2
```

**函数执行解析**
1. 为什么Foo可以在声明前提前执行？
在JavaScript中函数声明和函数表达式的特点是
* 函数声明会提前，而函数表达式则是在运行时赋值
* 函数会首先被提升，然后才是变量。也就是说在同一作用域下，函数会先被声明赋值。
这就是Foo可以提前执行的原因

2. 全局环境中没有声明b为什么可以打印出结果？
通过代码var a = b = 2，可以看出b在函数Foo内属于自由变量，b并未在函数Foo作用域内声明，仅仅在Foo作用域内赋值，那么结合作用域、作用域链、var声明的作用域来说，参数b被提升至全局作用域，初始值为undefined。

3. 为什么a不会被Foo影响？
在代码初始化时，全局声明了一个参数 a，且并未赋值，当执行Foo时又声明一个参数a，此时这个参数属于Foo的私有变量，有作用域限制，不会被外部访问。


**可以重复声明**
```js
// eslint-disable-next-line no-var
var a = 1
// eslint-disable-next-line no-var
var a = 2
console.log(a) // 2
```

**数据污染**
```js
for (var i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i)
  }, 1000) // 输出10次 10
}
```

## let、const

这两种声明方式属于es6新增的块级作用域声明

**特点**
1. 块级作用域不会被变量提升，只能先声明后访问，否则会造成暂时性死区
2. 不能重复声明
3. const声明的常量不能被修改，如果是引用数据类型，其内部的数据是可以修改的

```ts
if (true) {
  // console.log(a) 抛出异常 SyntaxError
  const a = 1
  console.log(a) // 1

  // console.log(b) 抛出异常 SyntaxError
  const b = 2
  console.log(b) // 2

  const c = {}
  c.name = 'nihao'
  console.log(c) // {name: 'nihao'}

}

console.log(a) // 抛出异常 ReferenceError
```

**块级作用域能够解决数据污染，以及变量提升**
```ts
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    console.log(i)
  }, 1000) // 输出 0 - 9
}
```

## import

es6提供的模块化方案

**导出**
```ts
export function Foo() {}

export default {
  func: Foo,
  name: '11111'
}
```

**import引入**
```ts
import Utils, { func } from './utils'

import * as Utils from './utils'
```

## 总结

**let、const、var的区别**

1. 变量提升
	> let、const不存在变量提升，只有当声明之后才能使用，否则会报错<br/>
	> var的声明存在变量提升，可以在声明前使用，直接使用则认为是顶层数据
2. 暂时性死区
	> var 不存在暂时性死区，因为var可以变量提升<br/>
	> let、const声明的参数，若提前使用则会报错提示无法访问数据或者数据未声明，这种情况称为暂时性死区
3. 块级作用域
	> let、const属于块级作用域<br/>
	> var 不存在块级作用域，属于全局参数
4. 重复声明
	> var可以重复声明<br/>
	> const、let不能重复声明
5. 修改声明的变量
	> const声明的参数不可修改