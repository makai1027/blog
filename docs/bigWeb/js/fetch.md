---
sidebar:
 title: 前端的请求方法有些？他们的区别是什么？
 step: 10
isTimeLine: true
title: 前端的请求方法有些？他们的区别是什么？
date: 2020-06-14
author: 马凯
tags:
 - 前端
 - JavaScript
categories:
 - 前端
---

# 前端的请求方法有些？他们的区别是什么？

## 请求方式分类
> 前端的请求封装工具有很多，vue-response、jQuery-ajax等等，此处不做一一介绍，我们按照原生、一步封装、es6，从旧到新了解请求工具的演变以及他们的不同。

* Ajax（async JavaScript and xml）
> 原生XMLHttpRequest请求
* axios 
> 对XMLHttpRequest的二次封装，利用了Promise技术，实现了异步回调，解决了回调地狱，使代码更加整洁美观，可读性，可维护性更高
* fetch
> fetch是原生http的请求方式，是XMLHttpRequest的替代方案，本身就支持Promise，不使用回调函数，是ES8新增的语法，所以对于低版本的浏览器内核兼容性不好<br/>
> fetch 使用数据流处理数据，对于请求大文件或者网速较慢的场景很好用，对于XMLHttpRequest则需要请求完成之后才能获取结果。<br/>
> 在默认情况下fetch不会接受或者发送cookie<br/>

## Ajax

Ajax全称为async JavaScript and xml，是浏览器早期的接口请求技术，能够实现不刷新页面的情况下进行页面局部刷新，主要是依赖XMLHttpRequest，如果多个请求之间存在依赖关系则会造成回调地狱。

### 属性及方法
**XMLHttpRequest的属性**
| 名称 | 说明 | 类型 | 
| ---- | ---- | ---- |
| onreadystatechange | 当请求状态发生变化时，则会触发该回调函数 |function | 
| readyState | 请求状态 | number |
| response | 请求响应体，返回一个 ArrayBuffer、Blob、Document，或 DOMString,返回类型取决于responseType | ArrayBuffer\|Blob\|Document\|DOMString|
| tresponseText | 返回一个DomString，包含请求的响应体，如果未发送，则为null | DomString \| null |
| responseType | 指定响应返回类型 | enum |
| status | 请求响应状态值 | number |
| timeout | 定义超时时间单位ms | number | 
| upload | 上传进度，返回当前上传状态 | function | 
| withCredentials | 是否允许跨域 | boolean |

**XMLHttpRequest的实例方法**
| 名称 | 说明 | 使用方法 |
| ---- | ---- | ---- |
| abort | 如果请求已发出，则立刻停止请求，用于请求终止 | xhr.abort() |
| open | 初始化请求 | xhr.open(method, url, sync, username, password), sync, username, password为可选值，sync默认为true，指是异步| 
|send|向服务端发送数据|xhr.send(data) | 
| setRequestHeader | 设置请求header属性，必须在open之后，send之前使用 | xhr..setRequestHeader(header, value)|


### 实现过程

**整体思路**
1. 创建XMLHttpRequest实例
2. 通过XMLHttpRequest.open方法与服务器建立连接,初始化一个请求
3. 通过XMLHttpRequest.send方法向服务器推送数据
4. 通过XMLHttpRequest提供的onreadystatechange，回调方法监听通信状态变化
5. 获取服务端返回数据并处理
6. 结合js  dom操作实现页面局部更新

**简单实现**

```ts
// 实例化XMLHttpRequest
const xhr = new XMLHttpRequest()

// 建立连接
xhr.open('get', 'https://www.baidu.com', true, 'username', 'password')

// 设置请求头
xhr.setRequestHeader('Accept', 'application/json')
xhr.setRequestHeader('token', '124')

// 向服务端发送数据
xhr.send({
  name: '111'
})

// 监听请求状态变化,
// readyState有五个状态
// 0 待发送
// 1 已发送正在请求
// 2 send已完成，已收到响应体
// 3 loading 正在解析响应体
// 4 请求响应体解析成功
xhr.onreadyStatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200)
    console.log(xhr.response)

}
```


**异步封装**
```ts
function formatParams(params) {
  let result = ''
  for (const k in params) {
    if (Object.hasOwnProperty.call(params, k))
      result += `&${k}=${params[k]}`

  }
  return `?${result.slice(1)}`
}

function ajax(options = {}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    options.method = (options.method || 'get').toUpperCase()
    if (options.responseType)
      xhr.responseType = options.responseType || 'json'

    if (options.method === 'GET')
      options.url = options.url + formatParams(options.params || {})

    xhr.open(options.method, options.url, true)

    if (options.header && typeof options.header === 'object' && Object.keys(options.header)) {
      for (const k in options.header)
        xhr.setRequestHeader(k, options.header[k])
    }

    if (options.method === 'GET')
      xhr.send(null)

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200)
        resolve(xhr.responseText)

      else
        reject(xhr.response)

    }
  })
}
```


**使用**
```ts
ajax({
  method: 'get',
  params: {},
  header: {
    accept: 'application/json'
  },
  url: ''
}).then((result) => {
  console.log(result)
}).catch((error) => {
  console.log(error)
})
```

## axios

> axios是使用Promise对XMLHttpRequest的二次封装，axios不是一个类，是一个方法集合，不能new，可以在浏览器和nodejs环境使用。

### 特点

* 从浏览器中创建 XMLHttpRequests
* 从 node.js 创建 http 请求
* 支持 Promise API
* 拦截请求和响应
* 转换请求数据和响应数据
* 取消请求
* 自动转换 JSON 数据
* 客户端支持防御 XSRF

### 使用

**单独执行**

```ts
axios.get('url', {})

axios.post('url', {})
```

**使用api**

```ts
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
})
```

**最常用的方式create**

```ts
const instance = axios.create({
  baseURL: '/',
  timeout: 6000,
  headers: {}
})

// 设置请求拦截
instance.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

// 设置返回拦截
instance.interceptors.response.use((response) => {
  return response
}, (error) => {
  return Promise.reject(error)
})
```

## fetch

### 介绍

* fetch是原生js，是http的请求数据方式，是XMLHttpRequest的替代方案，因为是ES8新增方法，所以低版本浏览器内核兼容性差
* fetch采用模块化设计，分别包括三大对象，Response、Request、Headers
* fetch对数据的处理方式采用的是stream数据流，非常适用于低网速和大文件
* fetch默认不携带cookie
* fetch不认为http请求状态4xx、5xx为错误状态，不会进入到catch


## 使用

```ts
fetch(input[, init]);
```

**input:**请求地址，也可以是是一个Request对象
**init:**fetch的配置对象，包含method（默认为get）、headers、body、mode、credentials等


```ts
// 直接请求blob文件
const myImage = document.querySelector('img')

const myRequest = new Request('flowers.jpg')

fetch(myRequest)
  .then((response) => {
    return response.blob()
  })
  .then((response) => {
    const objectURL = URL.createObjectURL(response)
    myImage.src = objectURL
  })
```

```ts
// 不写配置对象，则请求默认为get请求
fetch('wwww.soulferry.xyz').then(result => result.json()).then((result) => {
  console.log(result)
})

const myHeaders = new Headers()
myHeaders.append('Content-Type', 'application/json')

const myInit = {
  method: 'GET',
  headers: myHeaders,
  mode: 'cors',
  cache: 'default'
}

fetch('wwww.soulferry.xyz', myInit).then(result => console.log(result))
```

### fetch 相关的三个对象

* [Headers](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers)： 用于控制请求头，
* [Response](https://developer.mozilla.org/zh-CN/docs/Web/API/Response)： fetch请求后会得到一个响应对象Response
* [Request](https://developer.mozilla.org/zh-CN/docs/Web/API/Request)：用于服务器请求的模块，包含data、header、methoddeng

### fetch的缺点

* fetch不认为请求状态为4xx、5xx为错误，所以不会进入catch
* fetch请求如果不设置headers的content-type，需要在then内处理返回结果，例如result.json()/result.text()等
* fetch的get/head请求不能设置body

## fetch、ajax、axios的区别

* fetch是原生js的http异步请求，使用的promise
* Ajax利用的是原生XMLHttpRequest，会造成回调地狱
* axios属于针对XMLHttpRequest的二次封装，新增了异步方法，解决了回调地狱问题

