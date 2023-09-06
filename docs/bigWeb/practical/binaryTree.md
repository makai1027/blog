---
sidebar:
 title: 二叉树的遍历方式有哪些？
 step: 10
isTimeLine: true
title: 二叉树的遍历方式有哪些？
date: 2020-11-11
author: 马凯
tags:
 - 前端
 - JavaScript
 - 算法
categories:
 - 前端
---

# 二叉树的遍历方式有哪些？
:::tip
二叉树是指数据的每一个元素都有左右两个节点元素，如果没有则是叶子节点

:::

## 遍历方式
* 前序遍历
:::tip
* 1. 先访问根节点
* 2. 先对当前节点的左节点进行前序遍历，如果有子节点，则继续进行前序遍历
* 3. 对右节点进行前序遍历，如果有子节点，则继续进行前序遍历
:::

* 中序遍历
:::tip
先访问left节点，如果有子节点继续中序遍历，在访问根节点，最后访问right节点，如果存在子节点则继续中序遍历
:::

* 后序遍历
:::tip
先遍历left，如果有子节点则继续后序遍历，再遍历right节点，如果有子节点，则继续中序遍历，最后访问root
:::

* 层序遍历

## 测试数据
```ts
const root = {
  value: 'root-1',
  left: {
    value: 'l-1',
    left: {
      value: 'l-1-1',
      left: {
        value: 'l-1-1-1',
        left: null,
        right: null
      },
      right: {
        value: 'l-1-1-2',
        left: null,
        right: null
      }
    },
    right: {
      value: 'l-1-2',
      left: {
        value: 'l-1-2-1',
        left: null,
        right: null
      },
      right: {
        value: 'l-1-2-2',
        left: null,
        right: null
      }
    }
  },
  right: {
    value: 'l-2',
    left: {
      value: 'l-2-1',
      left: {
        value: 'l-2-1-1',
        left: null,
        right: null
      },
      right: {
        value: 'l-2-1-2',
        left: null,
        right: null
      }
    },
    right: {
      value: 'l-2-2',
      left: {
        value: 'l-2-2-1',
        left: null,
        right: null
      },
      right: {
        value: 'l-2-2-2',
        left: null,
        right: null
      }
    }
  }
}
```

## 前序遍历
1. 先访问根节点
2. 先对当前节点的左节点进行前序遍历，如果有子节点，则继续进行前序遍历
3. 对右节点进行前序遍历，如果有子节点，则继续进行前序遍历

### 简单实现
```ts
// 基础递归版本
function preOrder(root) {
  if (!root)
    return
  console.log(root.value)
  preOrder(root.left)
  preOrder(root.right)
}

// 非递归版本
function preOrder2(root) {
  if (!root)
    return
  const stack = [root]
  while (stack.length) {
    // 尾部截取
    const item = stack.pop()
    console.log(item.value)
    // 因为是尾部截取，所以先进一定是后出，前序遍历的需求是先根节点，后左节点，最后右节点
    if (item.right)
      stack.push(item.right)

    if (item.left)
      stack.push(item.left)

  }
}
```

## 中序遍历

原理：先访问left节点，如果有子节点继续中序遍历，在访问根节点，最后访问right节点，如果存在子节点则继续中序遍历

### 简单实现
```ts
// 递归版本
function inOrder(root) {
  if (!root)
    return
  inOrder(root.left)
  console.log(root.value)
  inOrder(root.right)
}

// 非递归版本
function inOrder(root) {
  if (!root)
    return
  const stack = []
  const p = root
  // 这边有两个判断一个是p，一个stack
  while (p || stack.length) {
    // 中序遍历需要先遍历左节点,需要把所有的左节点存下来
    while (p) {
      stack.push(p)
      p = p.left
    }

    const item = stack.pop()
    console.log(item.value)
    p = item.right
  }
}
```


## 后序遍历

原理：先遍历left，如果有子节点则继续后序遍历，再遍历right节点，如果有子节点，则继续中序遍历，最后访问root

### 简单实现
```ts
// 递归版本
function nextOrder(root) {
  if (!root)
    return

  nextOrder(root.left)
  nextOrder(root.right)
  console.log(root.value)
}

// 非递归版本
function nextOrder2(root) {
  if (!root)
    return
  const stack = [root]
  const outStack = []
  while (stack.length) {

    /**
     * 后边遍历的顺序是 left right root
     * 这里有两个while循环，先存，然后在通过pop取，那么为了保证取到的顺序是1.left 2.right 3root
     * 那么存的顺序一定是root right left
     * 按照以上逻辑
     *
    */

    //  * 1. 首先存放到outStack内的一定是root，这样root一定是最后一个取到
    const item = stack.pop()
    outStack.push(item)

    //  * 2. 为了保证在stack内通过pop尾部删除取到1. right 2. left，所以需要先存left 再存right
    if (item.left)
      stack.push(item.left)

    if (item.right)
      stack.push(item.right)

  }

  while (outStack.length) {
    const item = outStack.pop()
    console.log(item.value)
  }
}
```

## 层序遍历

按照二叉树的层级从上到下一层层打印，层级顺序为从左到右。
有点像数组的深度优先算法。

```ts
function deepOrder(root) {
  if (!root)
    return
  const stack = [root]
  const res = []

  while (stack.length) {
    // 每一层存放的左右节点数量不一样
    const len = stack.length
    const child = []
    for (let i = 0; i < len; i++) {
      // 通过头部截取
      const item = stack.shift()
      child.push(item.value)

      // 因为上边是头部截取，所以为了保证头部截取先取到left，后取right，所以先pushleft
      if (item.left)
        stack.push(item.left)

      if (item.right)
        stack.push(item.right)
    }
    res.push(child)
  }
  console.log(res)
}
```
