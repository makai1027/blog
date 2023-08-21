---
sidebar:
 title: 说说你对箭头函数的理解?
 step: 10
isTimeLine: true
title: 说说你对箭头函数的理解?
date: 2020-04-14
author: 马凯
tags:
 - 前端
 - JavaScript
categories:
 - 前端
---

# 说说你对箭头函数的理解?

:::tip
箭头函数是es6中对函数的一种全新写法，将函数的简洁性发挥到极致。
:::


## 简单使用

```ts
// 可以直接返回结果
const a = () => 1 + 1

const b = name => console.log(name)

// const c = (name, age) => {
//     return name + age
// }
```

## 箭头函数和普通函数的区别

### 1. 箭头函数比普通函数更加简洁
* 如果没有参数，可以直接写一个空括号
* 如果只有一个参数，可以省略括号包裹(),例如：name => console.log(name)
* 如果函数返回值只有一句，可以直接一行书写，省略花括号


### 2. 箭头函数没有this
箭头函数的this，永远指向函数调用方所在的作用域，箭头函数本身没有this

举个例子：
```ts
const id = 'global'
const obj = {
  id: 'inner',
  a() {
    console.log(this.id)
  },
  b: () => {
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    console.log(this.id)
  }
}

obj.a() // inner
obj.b() // global
```

因为obj.b的调用环境属于顶层作用域 window，那么顶层作用域内的生命id为global，所以obj.b的执行结果为global

### 3. 箭头函数没有构造函数
> 因为没有构造函数，没有原型链对象
* 箭头函数不能使用new创建
* 箭头函数不能使用bind、apply、call改变其作用域
* 箭头函数没有自身的this
* 箭头函数没有自己的arguments，不过能够使用...args进行替换
* 箭头函数没有prototype指向，因为原型对象