---
sidebar:
 title: 如何手写Promise?
 step: 10
isTimeLine: true
title: 如何手写Promise?
date: 2020-07-11
author: 马凯
tags:
 - 前端
 - JavaScript
categories:
 - 前端
---

# 如何手写Promise

:::tip

JavaScript中Promise是es6新增的特性，能够实现异步调用，

优点：
1. 解决了JS代码的回调地狱
2. 代码简洁，语句清晰
3. 能够实现链式调用

不足点：
1. 相对generater函数和async、await还是不够简洁


概念：Promise内部有三种状pending、fulfilled、rejected，这三种状态属于不可逆状态
:::


## 简单实现

```ts
function _Promise(exec) {
  // 声明实例属性
  this.status = 'pending'
  this.value = ''
  this.resolveCallbacks = [] // 用于存储成功和失败的回调
  this.rejectCallbacks = []
  const resolve = function (value) {
    if (this.status === 'pending')
      this.status = 'fulfilled'
    this.value = value
    this.resolveCallbacks.forEach(fn => fn())

  }

  const reject = function (error) {
    if (this.status === 'pending')
      this.status = 'rejected'

    this.value = error
    this.rejectCallbacks.forEach(fn => fn())
  }

  try {
    ex
  }
}
```

