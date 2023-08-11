--- 
siderbar: 
    title: 深拷贝和浅拷贝
isTimeLine: true
title: 深拷贝和浅拷贝
date: 2020-05-13 10:00:00
author: 马凯
aside: true
tags:
 - 前端
 - JavaScript
categories:
 - 前端
---

# 深拷贝和浅拷贝

:::tip
说到JS的深拷贝和浅拷贝，一定要降到堆内存和栈内存，该部分已在[JS中基本数据类型以及它们的区别](./baseData.md)做了解释；<br/>
<br/>
简单来说，就是**浅拷贝**仅仅是复制了原数据的内存地址，相当于两个数据指针指向一个堆内存区块，通过任意一个指针更改数据都会修改堆内存区块信息，导致另外一个指针也发生了更改；<br/>
<br/>
**深拷贝**则是将堆内存区块复制了一个，并新生成一个新的栈内存指针，指向新的堆内存区块，新指针发生更改不会影响原数据。
:::


## 浅拷贝

**浅拷贝是指对基本数据类型的拷贝或者对引用数据类型的内存地址拷贝**

```ts
// 基本数据类型示例
const a = 1 // 可以是基本数据类型的其他类型
let b = a // 这个时候就实现了浅拷贝,
b = 3 // b发生修改则a也会更改
console.log(a) // 3

// 引用数据类型的浅拷贝
const obj = {
  name: 'nihao',
  age: 12
}
const test = obj // 内存指针的拷贝，实际跟obj指向的同一个堆内存区块
test.name = 'world' // 直接更改实际上是更改的同一个堆内存区块数据
console.log(obj.name) // world
```

### 浅拷贝的常用方法

* Object.assign
* Array.slice
* 扩展运算符 ...
* concat
* array.push
* Array.from


## 深拷贝
**深拷贝则是将堆内存区块复制了一个，并新生成一个新的栈内存指针，指向新的堆内存区块，新指针发生更改不会影响原数据。**

常用方式：
* lodash - cloneDeep
* JQuery - $.extend
* JSON.parse(JSON.stringify(target))
* 手写递归函数

### JSON.parse(JSON.stringify(target))
**该方法一定要慎用，因为仅能对基本数据类型进行深拷贝，针对原生对象（Date、RegExp、）、null、undefined、function、Error，则会发生数据类型更改**

**存在的问题**
> 这还是在 还未测试其他的原生对象的情况下
1. 无法处理BigInt
2. symbol会丢失
3. Date对象会发生数据类型变更
4. Error会变成{}

```ts
const test = {
  a: new Date(),
  b() {
    console.log('nihao')
  },
  c: new Error('llll'),
  d: '',
  e: 1,
  f: null,
  g: undefined,
  h: true,
  i: Symbol('ss'),
//   j: BigInt(9007199254740991),
}

const target = JSON.parse(JSON.stringify(test))

console.log(target)
// 返回结果如下：
// {
//     "a": "2023-08-10T09:58:07.028Z",
//     "c": {},
//     "d": "",
//     "e": 1,
//     "f": null,
//     "h": true
// }
```

### 手写递归方法

```ts
function cloneDeep(target) {
  if (!target || typeof target !== 'object')
    return target

  const result = Array.isArray(target) ? [] : {}

  for (const k in target) {
    if (target.hasOwnProperty(k))
      result[k] = cloneDeep(target[k])

  }

  return result
}
```