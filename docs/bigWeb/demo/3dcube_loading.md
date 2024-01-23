---
sidebar:
 title: 纯css 3D立体加载动画
 step: 10
isTimeLine: true
title: 纯css 3D立体加载动画
date: 2024-01-12
author: 马凯
tags:
 - 前端
 - JavaScript
categories:
 - 前端
---

# 纯css 3D立体加载动画

## 基础知识以及参数示例
> 虽然css能够实现3d动画，但是在实际开发中运用较少，对于部分基础css知识，会存在部分盲区，所以需要提前知道一下知识点，用于方便理解。

- [transform-style: preserve-3d，设置元素所在空间是3d还是平面](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-style)
- [perspective-origin: 观察者的位置](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective-origin)
- [perspective 景深，理论为观察者与z=0的平面距离](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective);
- [translateX](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/translateX)
- [translateY](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/translateY)
- [translate3d](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/translate3d)
- [rotate3d](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/rotate3d)
- [rotateX](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/rotateX)
- [rotateY](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/rotateY)
- [rotateZ](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/rotateZ)
- [css - animation动画](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_animations/Using_CSS_animations)


## 示例-1

> 当前示例虽然实现了正方形六面的3d，但是由于容器有背景参照，能够清楚的看出，容器是提供给六个面3d空间，它本身处于2地平面空间

:::demo
  css/cube3D-1.vue
:::

## 示例-2

> 为了防止容器层处于2D平面，我们再加一层， 一下以codesandbox的cube loading为例

:::demo
  css/cube3D-2.vue
:::


## 示例-3
:::demo
  css/cube3D-3.vue
:::

> 这个动画我写不好
