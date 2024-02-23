---
sidebar:
 title: CSS中clip-path的使用详解
 step: 10
isTimeLine: true
title: CSS中clip-path的使用详解
date: 2024-02-02 15:27:00
author: 马凯
tags:
 - 前端
 - CSS
categories:
 - 前端
---

# CSS中clip-path的使用详解

> 该CSS属性是通过剪裁的方式创建元素的可视区域，区域外隐藏，有点类似操作svg

## 使用方法以及参数示例

:::demo
  css/clip-path/index-1.vue
:::

```css
  /* Keyword values */
  clip-path: none;

  /* <clip-source> values */
  clip-path: url(resources.svg#c1);

  /* <geometry-box> values */
  clip-path: margin-box;
  clip-path: border-box;
  clip-path: padding-box;
  clip-path: content-box;
  clip-path: fill-box;
  clip-path: stroke-box;
  clip-path: view-box;

  /* <basic-shape> values */
  clip-path: inset(100px 50px);
  clip-path: circle(50px at 0 100px);
  clip-path: ellipse(50px 60px at 0 10% 20%);
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  clip-path: path(
    "M0.5,1 C0.5,1,0,0.7,0,0.3 A0.25,0.25,1,1,1,0.5,0.3 A0.25,0.25,1,1,1,1,0.3 C1,0.7,0.5,1,0.5,1 Z"
  );

  /* Box and shape values combined */
  clip-path: padding-box circle(50px at 0 100px);

  /* Global values */
  clip-path: inherit;
  clip-path: initial;
  clip-path: revert;
  clip-path: revert-layer;
  clip-path: unset;

```
