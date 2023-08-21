---
sidebar:
 title: apply,call,bind
 step: 10
isTimeLine: true
title: apply,call,bind的异同
date: 2020-04-14
author: 马凯
tags:
 - 前端
 - JavaScript
categories:
 - 前端
---
# apply,call,bind 的异同

## 背景
:::tip
JavaScript中有一个关键的概念是执行上下文，就是指JavaScript代码呗解析和执行的临时环境。<br/>
**执行上下文和作用域不同，执行上下文只有在运行时确认，也就是这个时候确定了this的指向，可以通过外部方法更改；而作用域在声明时就已确认。**<br/>
执行上下文分类:<br/>
* 函数执行上下文
* 全局执行上下文
* eval函数执行上下文，eval主要是将字符串转化为JavaScript代码，这个过程非常耗性能

apply/call/bind的作用就是更改函数执行上下文的，可以理解为更改函数内部的this指向；
:::

## 相同点
1. 更改this指向
:::tip
MDN:bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数,返回的新函数可以被New创建

:::

```ts
const target = {
  a: 1,
  b: 2,
  test(...args) {
    console.log(this.a + this.b, ...args)
  }
}

target.test() // 3
target.test.apply({ a: 2, b: 2 }, ['hello', 'world']) // 4, 'hello', 'world'
target.test.call({ a: 3, b: 3 }, 'hello', 'world') // 6, 'hello', 'world'
target.test.bind({ a: 4, b: 4 }, 'haha')('hello', 'world') // 8, 'haha' 'hello', 'world'
```

2. 第一个参数都是新的作用域指向
## bind/call/apply不同点

**传参方式不一样**
* bind(this,...argv), bind在声明和执行时都可以传入其他参数，bind会返回一个新的函数，返回的新函数也能传参。
* call(this,...argv)，call的传参方式是枚举参数
* apply(this,[...argv])，apply的传参方式是数组的方法

```js
function test(a, b) {
  // eslint-disable-next-line @typescript-eslint/no-invalid-this
  console.log(this, a + b)
}

test.call('call', 1, 2) // [String: 'call'] 3
test.apply('apply', [2, 4]) // [String: 'apply'] 6
test.bind('bind', 3, 6)() // [String: 'bind'] 9
```

## 简单实现
测试用例
```js
function test(a, b) {
  // eslint-disable-next-line @typescript-eslint/no-invalid-this
  console.log(this, a + b)
}

// 用于将参数转化为数组
const slice = Array.prototype.slice
```
### 手写call方法
```js
// 第一个参数是作用域指向，剩余参数为枚举入参
Function.prototype._call = function (ctx) {
  // global 用于node，可以不写
  ctx = ctx || window || globalThis

  const args = slice.call(arguments, 1)

  // 暂存一个执行方法
  ctx.fn = this

  // 获取执行结果
  const result = ctx.fn(...args)

  // 因为ctx.fn本不属于ctx，所以获取到结果后删除
  delete ctx.fn

  return result
}

test._call({ name: '我是测试' }, 1, 2)
// {
//     "name": "我是测试"
// }
// 3

// 如果没有delete ctx.fn
// 你会发现返回的对象内多了一个fn,是一个函数，指向test
```
### 手写apply
> 这个就很简单了，跟call的却别就在于第二个参数，我们稍微改一下就可以
```js
Function.prototype._apply = function (ctx) {
  // global 用于node，可以不写
  ctx = ctx || window || globalThis

  const args = slice.call(arguments, 1)

  // 暂存一个执行方法
  ctx.fn = this

  // 获取执行结果
  let result = null
  if (args[0] && args[0].length)
    result = ctx.fn(...args[0])

  else
    result = ctx.fn()

  // 因为ctx.fn本不属于ctx，所以获取到结果后删除
  delete ctx.fn

  return result
}

test._apply({ name: '我是测试' }, [1, 2])
// 返回结果
// {
//     "name": "我是测试"
// }
// 3

// 如果没有delete ctx.fn
// 你会发现返回的对象内多了一个fn,是一个函数，指向test
```
### 手写bind方法
```js
Function.prototype._bind = function (ctx) {
  if (typeof this !== 'function')
    throw new Error('_bind 试图绑定的内部不可用')

  ctx = ctx || window || globalThis
  const fn = this
  const args = slice.call(arguments, 1)

  const f = function () {
    // 因为bind返回的新函数也可以传值
    const _args = slice.call(arguments)
    // 在绑定原函数 fn 时增加一次判断，如果 this 是 f 的一个实例
    // 那么此时 f 的调用方式一定是 new 调用
    // 所以，this 直接绑定 this(f 的实例对象) 就好
    // 否则，this 依旧绑定到我们指定的 ctx 上
    return fn.apply(this instanceof f ? this : ctx, [...args, ..._args])
  }

  // 这一步很重要, 这里我们必须要声明 f 的 prototype 指向为原函数 fn 的 prototype
  f.prototype = fn.prototype

  return f

}

test._bind('123', 4, 5)() // [String: '123'] 9

// bind 测试 函数new的时候
function Person() {
  console.log(this.name, this.age)
}
Person.prototype.name = '小明'
Person.prototype.age = 12

const Child = Person._bind({ name: '小红', age: 20 })
Child() // 小红，20

new Child() // 小明, 12
```
