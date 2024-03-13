---
title: Promise/generator/async&await的区别以及优缺点，Promise能否取消？
date: 2024-03-13 10:20:00
author: 马凯
tags:
 - 前端
 - 知识点
categories:
 - 前端
sidebar:
  title: Promise/generator/async&await的区别以及优缺点，Promise能否取消？
isTimeLine: true
---

# Promise/generator/async&await的区别以及优缺点，Promise能否取消？

## Promise

**定义**：Promise是异步编程的解决方案之一，能够有效的解决回调地狱，提高代码的可维护性、整洁度、可读性，能够通过链式操作大大降低代码的开发难度

### 内部状态

Promise的实例内部有**三个不可逆**的状态

1. pending - 等待执行阶段
2. fulfilled - 执行完毕
3. rejected - 执行失败


### 实例方法

1. PromiseInstance.then
  * then的实例方法有两个回调函数第一个是成功的回调，第二个是失败的回调
  * then能够继续调用.then是因为在实例方法的内部返回了实例自身

2. PromiseInstance.catch - 失败的回调

3. PromiseInstance.finally - 异步完成的实例方法


[如何手写Promise请查看](http://localhost:5173/bigWeb/practical/promise.html)


### 构造函数方法

1. Promise.race()

> 将多个异步实例封装成一个，只返回第一个执行结束的，无论成功或者失败
```ts
Promise.race([promiseA, PromiseB, PromiseC]).then((result) => {
  console.log(result)
})
```

2. Promise.allSetteld
> 参数是一个数组，必须是有promise组成，等待所有的promise执行结束返回一个执行结果数组，每一个结构都有一个status状态、返回参数value、错误信息reason

```ts
Promise.allsetteld([promiseA, PromiseB, promiseC]).then((result) => {
  const [resA, resB, resC] = result
  if (resA.status === 'fulfilled')
    console.log('xxxx')
})
```

3. Promise.all
> 接受一个数组，可以是声明常量，函数、异步，必须所有的promise都成功才会返回成功，是一个数组

```ts
const promise1 = Promise.resolve(3)
const promise2 = 42
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo')
})

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values)
})
// Expected output: Array [3, 42, "foo"]
```

4. Promise.any
> 只返回第一个执行成功的异步，接受promise数组作为参数

```ts
const promise1 = Promise.resolve(3)
const promise2 = 42
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo')
})

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values)
})
// Expected output: Array [3, 42, "foo"]
```

5. Promise.resolve
6. Promise.reject
7. Promise.withResolvers
> 新增的静态方法，没有接收参数，返回一个对象，包含了一个promise以及两个拦截方法 resolve、reject

```ts
const { resolve, reject, promise } = Promise.withResolvers()

// 等价于

let resolve, reject
const promise = new Promise((res, rej) => {
  resolve = res
  reject = rej
})
```


## Generator函数

> Generator是解决异步编程的方案之一，与promise、async/await均是解决异步的方案
> Generator函数会返回一个遍历器对象，可以依次遍历Generator函数的内部状态，形式上Generator是一个普通的函数，但是有两点
1. function匿名函数之间有*连接
2. 函数体内部使用yield表达式，定义不同的内部状态
3. 通过next方法进入下一状态

### 使用示例
```ts
function* helloWorldGenerator() {
  yield 'hello'
  yield 'world'
  return 'ending'
}
const hw = helloWorldGenerator()
// 该函数存在三个状态 hello -> world -> ending
```

### 执行过程分析
1. 只有通过next方法才会遍历到下一个内部状态
2. 遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。
3. 下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式
4. 如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。
5. 如果该函数没有return语句，则返回的对象的value属性值为undefined


## Generator、Promise、async/await的区别？

1. Promise和async/await是用来专门解决异步操作的
2. Generator并不仅仅是为了异步设计的，他还有其他功能（对象迭代、控制输出等等）
3. Promise的代码结构相对于Generator、async/await更复杂，且可读性相对较差
4. Generator、async需要搭配Promise使用
5. async实际上是Generator的语法糖，相当于自动执行Generator的next
6. async使用上更简洁，将异步代码以同步代码的形式编写，实现异步处理的解决方案


## Promise的中断方案

> **Promise有一个缺点就是一旦实例开始执行则无法中断取消，只能等待执行状态到达fulfilled、rejected状态，但是开发中又可能遇到此类需求**

### 可能产生中断Promise的场景或者原因

1. **不需要Promise的执行结果**：在某些场景下，在异步函数执行结束前，就已经拿到了想要的结果，这个时候为了避免不必要的资源以及时间浪费，所以中断Promise的执行
2. **超时处理**：超时处理是最常用的场景，比如Http请求、拦截操作等等
3. **用户主动取消**：比如说用户打开一个弹窗，该弹窗内部展示信息需要进行请求，但是在请求未结束前，用户关闭了弹窗，这个请求也就无效了，所以需要进行取消
4. **错误处理**：当条件处理时，不满足条件的异步请求需要取消

主动中断异步请求，能够提高代码的灵活性，避免了不必要的资源消耗，并及时对用户的操作进行了响应。


### 使用AbortController进行取消

> **AbortController**是一个比较新的API，所以最好是考虑兼容性

```ts
const constroller = new AbortController()
const signal = controller.signal

const promise = new Promise((resolve, reject) => {
  // 模拟请求
  const timer = setTimeout(() => {
    console.log('执行结束')
    resolve('你好世界')
  }, 4000)

  signal.addEventListener('abort', () => {
    clearTimeout(timer)
    reject(new Error('用户主动取消'))
  })
})

// 必要时主动执行
signal.abort()
```

### 使用闭包函数和标记变量

> 该方法的核心原理在于将Promise的reject方法赋值给其他参数，并返回出去

```ts
function createCancelAblePromise() {
  let _cancelFunc_ = null
  let timer = null
  const promise = new Promise((resolve, reject) => {
    _cancelFunc_ = reject
    // 模拟请求
    timer = setTimeout(() => {
      console.log('执行结束')
      resolve('你好世界')
    }, 4000)
  })

  // 赋值中断函数
  promise.cancel = function () {
    clearTimeout(timer)
    _cancelFunc_(new Error('用户主动取消'))
  }

  return promise
}

const promise = createCancelAblePromise()

promise.then((res) => {
  console.log(res)
}).catch((error) => {
  console.log(error)
})

promise.cancel()
```

### 合理使用Promise.race
```ts
// 设置一个超时异步函数
const timeoutPromise = new Promise((_, reject) =>
  setTimeout(() => reject(new Error('请求超时')), 5000)
)
// 赋值一个异步函数
const request = someAsyncFunction()

Promise.race([timeoutPromise, request])
  .then((result) => { /* 处理结果 */ })
  .catch((err) => {
    if (err.message === '请求超时') {
      // 请求被取消
    }
    else {
      // 其他错误处理
    }
  })
```

### 利用axios的cancelToken


### 异步中断的优缺点

 在 JavaScript 中,中断或取消 Promise 请求有一些优缺点,需要权衡利弊:

**优点:**

1. **提高性能和响应能力**:取消无用或不再需要的请求可以节省资源,提高应用程序的整体性能和响应能力。特别是在网络环境较差的情况下,这一点尤为重要。

2. **改善用户体验**:用户可以随时取消长时间运行的操作,而不必等待它完成或耗尽系统资源。这增强了用户对应用程序的控制力。

3. **避免浪费资源**:取消不需要的请求可以节省带宽、内存和 CPU 资源,从而避免不必要的资源浪费。

4. **简化错误处理**:如果请求被取消,可以统一地处理这种情况,而不必区分各种请求失败的原因。

**缺点:**

1. **增加复杂性**:实现可取消的 Promise 需要一些额外的代码,增加了应用程序的复杂性。

2. **不容易调试**:取消请求可能会导致一些意外的行为,使调试变得更加困难。

3. **可能造成数据不一致**:如果请求在执行过程中被取消,可能会导致数据不一致或状态不正确的情况。

4. **潜在的竞态条件**:在并发环境下,取消请求可能会引入竞态条件,需要格外小心。

5. **中断操作的开销**:根据具体实现,中断请求的操作本身可能会带来一些开销,影响性能。

总的来说,在需要中断长时间运行的异步操作、提高应用程序响应能力或改善用户体验时,实现可取消的 Promise 是有益的。但同时也需要权衡所增加的复杂性和调试难度。在简单的场景下,引入可取消的能力可能得不偿失。关键是根据具体情况和需求,选择适合的方案。
