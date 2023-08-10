---
sidebar:
 title: apply,call,bind
 step: 10
isTimeLine: true
title: apply,call,bind的异同
date: 2020-04-14
tags:
 - 前端
 - JavaScript
categories:
 - 前端
---
# apply,call,bind 的异同

## 相同点
1. 更改this指向
:::tip
MDN:bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数
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
## bind/call/apply不同点

**传参方式不一样**
* bind(this,...argv), bind在声明和执行时都可以传入其他参数，bind会返回一个新的函数
* call(this,...argv)
* apply(this,[...argv])

```js
function test(a, b) {
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
  console.log(this, a + b)
}
```
### mycall
```js
Function.prototype.mycall = function (thisArg) {
  if (typeof this !== 'function')
    throw 'error'

  if (!(thisArg instanceof Object))
    thisArg = new Object(thisArg)

  thisArg = thisArg || window
  thisArg.fn = this
  const args = [...arguments].slice(1)
  const res = thisArg.fn(...args)
  delete thisArg.fn
  return res
}
test.mycall({ a: 1, b: 2 }, 1, 2) // { a: 1, b: 2, fn: [Function: test] } 3

// 不考虑边界情况的简单写法
Function.prototype.myCall = function (thisArg, ...argArray) {
  thisArg = thisArg || window
  thisArg.fn = this
  const res = thisArg.fn(...argArray)
  delete thisArg.fn
  return res
}
```
### myapply
```js
Function.prototype.myapply = function (thisArg) {
  thisArg = thisArg || window
  if (!(thisArg instanceof Object))
    thisArg = new Object(thisArg)

  thisArg.fn = this
  let res = null
  if (arguments[1])
    res = thisArg.fn(...arguments[1])

  else
    res = thisArg.fn()

  delete thisArg.fn
  return res
}
test.myapply({ a: 2, b: 4 }, [4, 4]) // { a: 2, b: 4, fn: [Function: test] } 8

// 简单写法
Function.prototype.myApply = function (thisArg, argArray = []) {
  thisArg = thisArg || window
  thisArg.fn = this
  let res
  if (argArray.length === 0)
    res = thisArg.fn()

  else
    res = thisArg.fn(...argArray)

  delete thisArg.fn
  return res
}
```
### mybind
```js
Function.prototype.mybind = function (thisArg) {
  const that = this
  const args = [...arguments].slice(1)
  return function F() {
    const bindArgs = args.concat(...arguments)
    if (this instanceof F)
      return new that(...bindArgs)

    return that.apply(thisArg, bindArgs)
  }
}

test.mybind('123', 4, 5)() // [String: '123'] 9
```
