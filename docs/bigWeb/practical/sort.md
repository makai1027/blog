---
sidebar:
 title: 排序方法有哪些？
 step: 10
isTimeLine: true
title: 排序方法有哪些？
date: 2020-11-10
author: 马凯
tags:
 - 前端
 - JavaScript
 - 算法
categories:
 - 前端
---


# 排序方法有哪些？

排序算法是日常开发比较常见的一种数据处理场景，为了更好高效的处理数据，有必要掌握数据排序的部分知识。

## 常见的排序算法有哪些？

* 冒泡排序
* 选择排序
* 插入排序
* 归并排序
* 快速排序
* sort
* reverse

## 冒泡排序

:::tip
冒泡排序的特点：
1. 每次对比前后两个相邻的元素，如果前一个大于后一个那么则交换位置。
2. 对每一对相邻元素重复步骤1，这样最后的元素一定是最大的
3. 针对所有的元素重复以上步骤，**除了最后一个**
4. 重复步骤1-3，直到所有的元素重新排列
:::

### 简单实现
```ts
const array = [9, 8, 2, 12, 23, 4, 23, 5, 6, 74, 5]
function bubbleSort(arr) {
  // 两两对比需要重复length次
  for (let i = 0; i < arr.length; i++) {
    // 最后一个不用对比，所以length - 1次
    for (let j = 0; j < arr.length - 1; j++) {
      const pre = arr[j]
      const next = arr[j + 1]
      if (pre > next)
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
    }
  }
  return arr
}
bubbleSort(array) // [2, 4, 5, 5, 6, 8, 9, 12, 23, 23, 74]
```

**图示**
![bubbleSort](../../assets/bubbleSort.gif)

## 选择排序

:::tip
选择排序的特点：
1. 每次排序从待排序的元素中挑一个最小或者最大的元素，存在数组的起始位置
2. 继续从剩余的元素中，找最大或者最小的元素，存放在次位
3. 重复1、2两步，直到所有的元素排序完成
:::

### 简单实现
```ts
const array = [9, 8, 2, 12, 23, 4, 23, 5, 6, 74, 5]

// 利用math.min或者max方法获取最大最小元素，通过splice截取删除元素重新拼合新元素，最后返回
function selectSort(arr) {
  const stack = [...arr]
  const result = []
  while (stack.length) {
    const min = Math.min(...stack)
    const index = stack.findIndex(el => el === min)
    stack.splice(index, 1)
    result.push(min)
  }
  return result
}

selectSort(array) // [2, 4, 5, 5, 6, 8, 9, 12, 23, 23, 74]

function selectSort2(arr) {
  // 定义一个最小索引
  const minIdnex = 0
  // 因为需要前一个和后一个对比，所以第一层循环不能到最后一个，因为本身不需对比
  for (let i = 0; i < arr.length - 1; i++) {
    minIndex = i
    // 对比剩余待排序元素
    for (let k = i + 1; k < arr.length; k++) {
      if (arr[k] < arr[minIndex])
        minIndex = k
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
  }
  return arr
}

selectSort2(array) // [2, 4, 5, 5, 6, 8, 9, 12, 23, 23, 74]
```
**图示**
![selectSort](../../assets/selectSort.webp)



## 插入排序

:::tip
插入排序的特点就是：
1. 把已排序和待排序的数组分为两个部分，初始化的时候，默认第一个元素是已排序的。
2. 从第二个元素开始，在已排序的数组中对比找到第二个元素的合适位置
3. 重复以上步骤直到所有的元素排序完成

**只需要记住每次从待排序的数组中取一个元素，重新在已排序的数组中排序即可,。**
:::

### 简单实现
```ts
const array = [9, 8, 2, 12, 23, 4, 23, 5, 6, 74, 5]

function inertSort(arr) {
  const len = arr.length
  let preIndex
  let nextIndex
  for (let i = 1; i < len; i++) {
    // 这里是已排序元素的最后一个元素的索引
    preIndex = i - 1
    // 这里代指 待排序元素的第一个元素， 如果说待排序的第一个元素，小于已排序的最后一个元素，那么说明该元素，需要重新排序，反之则不动
    nextIndex = i
    while (preIndex > 0 && arr[preIndex] > arr[nextIndex]) {
      arr[preIndex + 1] = arr[preIndex]
      preIndex--
    }
    arr[preIndex + 1] = arr[nextIndex]
  }
  return arr
}

inertSort(array) // [2, 4, 5, 5, 6, 8, 9, 12, 23, 23, 74]

function inertSort2(arr) {
  for (let i = 0; i < arr.length; i++) {
    let len = i
    // 如果已排序的最后一个元素，大于待排序的第一个元素，则循环交替两个元素的位置
    while (len >= 0 && arr[len] > arr[len + 1]) {
      const temp = arr[len]
      arr[len] = arr[len + 1]
      arr[len + 1] = temp
      len--
    }
  }
  return arr
}
inertSort2(array) // [2, 4, 5, 5, 6, 8, 9, 12, 23, 23, 74]
```

**图示**
![insetSort](../../assets/insetSort.gif)


## 归并排序


## 快速排序
:::tip
快排序的特点
1. 将数组从中间隔开，取到中间索引，以中间索引为基数将数组分开
2. 将大于中间索引对应的值，分到右边的数组
3. 将小于中间索引对应的值，分到左边的数组
4. 左右两端的数组进行层层递归
5. 最终实现所有的元素重新排序
:::

### 简单实现
```ts
const array = [9, 8, 2, 12, 23, 4, 23, 5, 6, 74, 5]
function fastSort(arr) {
  if (!arr || arr.length <= 1)
    return arr
  // 取到中间索引
  const provit = Math.floor(arr.length / 2)
  //   小值数组
  const left = []
  //   大值数组
  const right = []
  //   中间索引对应的值, 这里一定要使用splice，中间值不参与循环
  const mVal = arr.splice(provit, 1)[0]
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > mVal)
      right.push(arr[i])

    else
      left.push(arr[i])

  }
  return fastSort(left).concat([mVal], fastSort(right))
}

fastSort(array) // [2, 4, 5, 5, 6, 8, 9, 12, 23, 23, 74]
```

## sort、reverse

这两个排序方式数组构造函数自带的，也是最常用的
```ts
[].sort((a, b) => a - b); // 从小到大

[].sort((a, b) => b - a); // 从大到小

[].reverse() // 数组取反
```

## 参考
* [面试官：说说常见的排序算法有哪些？区别？](https://github.com/febobo/web-interview/issues/267)