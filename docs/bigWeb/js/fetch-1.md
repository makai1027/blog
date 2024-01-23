---
sidebar:
 title: 如何给fetch添加超时功能？
 step: 10
isTimeLine: true
title: 如何给fetch添加超时功能？
date: 2024-01-23
author: 马凯
tags:
 - 前端
 - JavaScript
categories:
 - 前端
---


# 如何给fetch添加超时功能？

> fetch是前端新的请求方式，区别于XMLHttpRequest,fetch本身是支持异步，但是没有超时功能

## 方法一 - 利用promise.race 

```ts
function fetchTimeOut(timeout: 1000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('fetch timeout')), timeout)
  })
}

function request(url, options) {
  return Promise.race([fetch(url, options), fetchTimeOut(2000)])
}

// 调用方式
request('////', { method: 'POST' }).then((res) => {
  console.log(res)
}).catch((error) => {
  console.log(error)
})
```

## 方法二 - 利用 AbortController 主动取消

> 该方法来自mdn，详细操作请看[点击查看详情](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController)

```ts
function createFetchWithTimeout(url, options, timeout = 3000) {
  return new Promise((resolve, reject) => {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeout)
    fetch(url, {
      ...options,
      signal: controller.signal,
    }).then(resolve, reject).finally(() => {
      clearTimeout(timer)
    })
  })
}

// 使用示例
createFetchWithTimeout('xxxx', { method: 'POST' }).then((res) => {
  console.log(res)
}).catch((error) => {
  console.log(error)
})
```