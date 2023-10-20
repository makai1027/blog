---
sidebar:
 title: 异步并控制发器
 step: 10
isTimeLine: true
title: 异步并控制发器
date: 2021-01-11
author: 马凯
tags:
 - 前端
 - JavaScript
 - 手写题
categories:
 - 前端
---

# JS 如何实现异步并发控制器

## 异步控制器的概念以及作用

### 概念
> 异步编程是前端常用的一种编成方式，也是一种解决队列阻塞的优化方案，该方案可以使程序在未完成情况下，不阻塞进程继续等待执行结果，该过程其他代码正常执行。

### 作用
> 为了保证异步操作的顺序和优先级，或者避免过多的异步程序占用资源导致内存溢出，设计出一种独立于EventLoop之外的异步队列，该队列可以根据配置设置并发数量和先后顺序。
> 异步并发器保持先进先出的顺序，等待前者执行完毕，按照顺序仅需填充执行队列，已执行完毕则返回promise对象。
> 这样做的好处就是限制同时进行的异步任务数量，避免不必要的资源浪费，另外可以控制执行顺序。


## 具体实现

```ts
class Scheduler {
  max: number
  queue: Promise[]
  task: number
  constructor(max) {
    // 任务最大并发数量
    this.max = max
    // 任务队列
    this.queue = []
    // 当前正在执行的任务数量，控制不能超过并发量
    this.task = 0
  }

  // 添加任务
  async addTask(promiseExec) {
    /**
     * 如果队列当前任务数量（task）大于最大并发量max，则需阻塞任务添加， 要将新任务通过resolve进行封装添加到队列等待唤醒
     * 等待task小于 max时，将任务从resolve中取出，await 放入队列进行执行，本次add操作继续
    */

    if (this.task >= this.max)
      await new Promise(resolve => this.queue.push(resolve))

    this.task++
    let res = null

    try {
      res = await promiseExec()
      this.task--
      // 如果有待唤醒的add操作，则取一个执行
      if (this.queue.length) {
        // 保持先进先出，从头部取一个add resolve任务进行执行
        // 以便等待的添加add任务继续执行  添加操作
        const addExec = this.queue.shift()
        addExec()
      }
    }
    catch (error) {
      console.log(error)
    }
    return res
  }
}
```

## 功能测试

```ts
// 构建一个新的并发器
const scheduler = new Scheduler(2)

// 设置一个异步等待器
const sleep = (time: number) => new Promise(resolve => setTimeout(() => resolve(), time))

// 设置添加异步任务方法
function addTask(time, order) {
  // scheduler.addTask 返回一个promise，也需要导入一个promise
  scheduler.addTask(() => sleep(time).then(() => console.log(order)))
}

addTask(1000, '1')
addTask(300, '2')
addTask(500, '3')
addTask(800, '4')

// 顺序如下： 2 -> 3 -> 1 -> 4
```