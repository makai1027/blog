---
sidebar:
 title: CSS中有哪些长度单位以及它们的异同点？
 step: 10
isTimeLine: true
title: CSS中有哪些长度单位以及它们的异同点？
date: 2024-02-02 10:27:00
author: 马凯
tags:
 - 前端
 - CSS
categories:
 - 前端
---


# CSS中有哪些长度单位以及它们的异同点？

## css中的长度、高度单位

> 在css开发运用中经常会出现定义dom的长宽高、字体大小、边框大小、padding、margin等，这些都是会用到长宽高的地方，那么除了我们已经知道的  单位，还有那些长度、高度单位呢，我们一起来看看。


## 单位分类

css 的长度单位分为两类：**绝对长度** 和 **相对长度**

**绝对长度**: px、in、cm、mm、pt、pc

**相对长度**: em、rem、ex、vh、vw、vmin、vmax、%、fr、ch


## 详细介绍

### 绝对长度

> 绝对长度单位是一个真实的物理值，它的长度是固定的

1. **px**：表示像素，那么像素又是相当于屏幕分辨率的，页面内容都是按照像素单位显示的，这里像素仅仅是相对于硬件来说是绝对的；
如果说一个24寸的1080P显示器显示一张宽度100px的图片 和 在15寸的4K屏幕上显示同一张宽度100px的图片，24cun显示器显示的就会感官上很大；
产生以上问题是由像素的计算方式决定的，例如windows 的⽤户所使⽤的 分辨率96像素/英⼨ ，⽽ mac 的⽤户所使⽤的分辨率⼀般是 72像素/英⼨ ，⼀般javascript语⾔⾥的单位就是使⽤的像素。

```css
div {
  width: 200px
}
```

2. **in**：表示英寸（inch）是一个物理长度，但是在css中使用最终会转化为像素，计算方式为1in === 2.54cm === 96px（mac是72px）

```css
div {
  width: 1in
}
```

3. **cm**、**mm**： 厘米 和 毫米
1cm === 37.5px

1mm === 3.75px

```css
div {
  width: 1cm;
  height: 10mm
}

```


4. **pt** 和 **pc**

1pt === 1 / 72in === 1/96px(或者在mac 1 / 72px)

1pc === 12pt === 12 / (72或者96)in

```css
width {
  width: 1pc;
  height: 12pt
}

```


### 相对长度

> 相对长度的物理单位没有一个固定的值，他的大小受限于窗口大小、父元素大小等影响

1. **em**：em是字体大小的相对单位，浏览器的默认字体大小是16px，如果浏览器字体大小或者父元素字体大小未被修改那么1em === 16像素，如果父元素大小设置12px，那么1em === 12px，另外就是em讲究就近原则，如果html字体大小设置为20px，父元素设置字体大小为24px， 那么当前元素的1em === 24px

在没有任何CSS规则的前提下：（1em == 16px == 0.17in == 12pt == 1pc == 4.2mm == 0.42cm）

```scss
html {
  font-size: 12px

  .parent {
    font-size: 20px
    .child {
      font-size: 1em; // 当前字体大小受限于父级，20px
    }
  }
}

```

2. **rem**: rem 和 em ⼀样是⼀个相对单位，但是和 em 不同的是 rem 总是相对于 根元素 （如：html{}或者:root {}），⽽不像em⼀样使⽤级联的⽅式来计算尺⼨。这种相对单位使⽤起来更简单。

```scss
:root {
  font-size: 12px;

  div {
    font-size: 1rem; // 12px
  }

  .parent {
    font-size: 20px;
    .child-1 {
      font-size: 1rem; // 12px
    }
    .child-2 {
      font-size: 1em; // 20px
    }
  }
}

```

3. **ex**和**ch**，是两个相对于字符的长度单位，1ex 相对于 'x'字符的宽度，1ch 相对于 '0'字符的宽度，也就是说当前元素的字体大小越大，字符'x' 和 '0'的显示越大，那么1ex 和 1ch的宽度越大

```scss
div {
  width: 20ch;
  height: 20ex;
}

```

4. **vh**和**vw**,是两个相对于窗口可视区域大小的长度单位，这个窗口指的是浏览器的窗口

1vh === 窗口可视高度的1%
1vw === 窗口可视宽度的1%

```css
div {
  width: 100vw;
  height: 100vh; // 长宽随窗口大小变化
}

```

5. **vmin** 和 **vmax**， vmin的值是当前1vw 和 1vh中较小的值，vmax的值是1vw 和 1vh中 较⼤ 的那个值。

在标准 尺⼨类型的使⽤实例中，和由⾃⼰确定屏幕大小的vw、vh单位相⽐，vmin是⼀个更有⽤的度量标准。


```css
div {
  width: 100vmin;
  height: 100vmax;
}

```

6. **百分比%**,百分比这个很好理解，就是相对于**父级宽度**的百分之多少
例如父元素宽度为100px，子元素的宽度为50%，那么子元素的宽度为50px；

```scss
div {
  width: 200px;
  height: 200px;
  div {
    width: 100%;
    height: 50%;
  }
}
```

7. **fr**: gird布局中利⽤的⼀个长度单位，在gird布局中，我们经常会利⽤fr来进⾏计算。

下⾯这句语句则是声明三⾏的gird，第⼀⾏的⾼度为30px，第⼆⾏的同样为30px，第三⾏的为60px。

```css
div {
  grid-template-rows: 30px 1fr 2fr;
}
```

[有关grid布局的详细知识请移步这里--link--](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid)


