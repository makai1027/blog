---
sidebar:
 title: js常见的设计模式有哪些？使用场景是什么？
 step: 10
isTimeLine: true
title: js常见的设计模式有哪些？使用场景是什么？
date: 2020-10-14
author: 马凯
tags:
 - 前端
 - JavaScript
categories:
 - 前端
---

# js常见的设计模式有哪些？使用场景是什么？

> 设计模式是针对软件使用场景的解决方案，也可理解为特定问题的处理方案。

## 常见的设计模式

* 单例模式
* 代理模式
* 策略模式
* 迭代器模式
* 发布订阅模式
* 工厂模式
* 观察者模式


## 单例模式

单例模式特点就是全局只能有一个实例，重新创建的话，如果已经创建，则会将之前创建的实例返回。

### 使用场景
* 全局消息提示
* Vue项目，全局只有一个项目实例
* 网站登录入口
* 背景音频只有一个audio组件
* 全局状态存储，localStorage、sessionStorage、cookie

### 简单实现
```ts
function createTarget() {
  class Person {
    constructor(name) {
      this.name = name
    }
  }

  let child = null

  return function (name) {
    if (!child)
      child = new Person(name)

    return child
  }
}
```

## 代理模式

代理模式，是指通过一个类A控制，另外一个类B的功能，不能直接访问B，又称为结构型模式。

在代理模式中，只能创建A的实例，访问B的功能。

**特点**
1. 使用者无权访问目标对象
2. 中间代理，通过代理做授权控制

### 使用场景
* 事件委托，将事件绑定到ol、ul上实现li事件的代理
* Vue3响应式系统，通过Proxy对象代理响应式对象，实现数据的操作变化控制


### 简单实现

```ts
// 该类型不对外暴露
class Person {
  constructor(name) {
    this.name = name
  }

  say() {
    console.log(this.name)
  }
}

// 对外暴露类型， 对外暴露的类可能不止这一个受控类
class Student {
  constructor(name) {
    this.name = name
    this.person = new Person(name)
  }

  say() {
    this.person.say()
  }
}

const child = new Student('小明')
child.say() // 小明
```


## 策略模式

根据场景的不同进行封装，可以根据不同的环境场景进行动态切换。

**特点**
1. 条件判断
2. 功能兼容

### 使用场景
1. 项目中的条件判断if、else、Switch case等
2. 项目构建常用的环境变量env/env.production/env.development

### 简单实现

```ts
const target = {
  A: 1,
  B: 2,
  C: 3,
}
function foo(key) {
  return target[key]
}
```


## 迭代器模式
迭代器模式提供一个方法，能够顺序访问每一个聚合对象的元素

**特点**
* 访问一个聚合对象的内容而无需暴露它的内部构成。
* 为遍历不同的集合提供一个统一的接口，从而支持同样的算法在不同的集合结构上进行操作。
* 迭代器模式就是分离了集合对象的遍历行为，抽象出一个迭代器类来负责，这样既可以做到不暴露集合的内部结构，又可让外部代码透明地访问集合内部的数据。


### 使用场景
1. 任意需要遍历循环的功能

### 简单实现
```ts
function _each(arr, fn) {
  for (let i = 0; i < arr.length; i++)
    fn(i, arr[i])
}
```


## 发布订阅模式

发布订阅模式定义了一对多的关系，让多个订阅者同时监听某一个监听对象，当监听对象变化时，他会通知所有的订阅者。

**特点**
1. 实现发布者和订阅者之间的解耦关系，提高了代码的维护性和复用性
2. 支持异步处理，实现了延迟处理和批量处理
3. 如果订阅者不及时取消订阅则会造成内存泄漏

### 使用场景
1. vue数据响应式系统
2. 核心在于多个功能模块需要依赖该对象，通过该对象的变化进行切换
3. eventBus

### 简单实现
```ts
// 对象模式
const Mitt = {
  // 用于缓存
  list: {},
  // 订阅，并缓存回调函数
  subscribe(name, fn) {
    const item = this.list[name]
    if (item && Array.isArray(item) && item.length)
      item.push(fn)
    else
      this.list[name] = []
  },
  // 取消订阅，如果取消订阅，不传方法则默认全部清空
  unsubscribe(name, fn) {
    const item = this.list[name]
    if (!item)
      return

    if (!fn)
      delete this.list[name]

    const index = item.findIndex(f => f === fn)
    if (index > -1)
      item.splice(index, 1)

  },
  publish(name, params) {
    const item = this.list[name]
    if (!item || !item.length)
      return

    item.forEach((fn) => {
      fn(params)
    })

  }
}

// 字典模式
class Mitt {
  constructor() {
    this.map = new Map()
  }

  emit(name, params) {
    const item = this.map.get(name)
    if (!item)
      return

    item.forEach((fn) => {
      fn(params)
    })
  }

  on(name, fn) {
    const item = this.map.get(name)
    if (item && item.length)
      item.push(fn)
    else
      this.map.set(name, [fn])
  }

  off(name, fn) {
    const item = this.map.get(name)
    if (!item)
      return

    if (!fn)
      this.map.set(name, [])

    const index = item.findIndex(f => f === fn)
    if (index > -1)
      item.splice(index, 1)

  }

  clear() {
    this.map.clear()
  }
}
```


## 工厂模式

工厂模式是指根据不同的要求，生产出不同的实例对象。

**特点**
1. 统一管理不同的功能，按照需求返回
2. 封装简单实现最少、最简单的值，返回不同的实例

### 使用场景

1. vue-router
2. vue
3. 处理大量相同属性的小对象

### 简单实现

```ts
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }

  info() {
    console.log(this.name, this.age)
  }
}

class UserFactory {
  constructor() {}
  create(person) {
    switch (person) {
      case 'old':
        return new Person('老人', 80)
        break
      case 'child':
        return new Person('小孩', 10)
        break
      default:
        throw new Error('参数错误')
    }
  }
}
```

## 观察者模式

观察者模式 ：定义一些一对多的关系，将一系列的观察者对目标函数感兴趣，将自己添加进目标函数，当目标函数状态发生改变时，发送通知，以此通知附加在目标上的观察者

### 使用场景
1. vue的watch
2. dom的mutationObserver

### 简单实现
```ts
class Subject {
  constructor() {
    this.handlers = []
  }

  add(fn) {
    this.handlers.push(fn)
  }

  notify() {
    this.handlers.forEach(fn => fn.update())
  }
}

class Observer {
  constructor(name) {
    this.name = name
  }

  update() {
    console.log(this.name)
  }
}

const subject = new Subject()

subject.add(new Observer('1111111'))

subject.notify() // 111111
```