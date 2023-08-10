--- 
siderbar: 
    title: JS中判断数据类型的方法
isTimeLine: true
title: JS中判断数据类型的方法
date: 2020-05-12 14:40:00
author: 马凯
tags:
 - 前端
 - JavaScript
categories:
 - 前端
---

# JS中判断数据类型的方法

## 1. instanceof

:::tip
instanceof 多用于检测引用类型数据、以及多层继承关系的检测
**局限性：**
1. 无法检测六种基本数据类型：null、undefined、symbol、number、string、boolean,BigInt, null/undefined没有原型所以无法检测
2. 在类的原型继承关系中，instanceof检测的结果可能不准
3. 只要是通过原型链的__proto__能找得到，则返回true
:::

1. 除了null、undefined没有原型无法检测，symbol、number、string、boolean,BigInt也无法检测
```ts
console.log(1 instanceof Number) // false
console.log('' instanceof String) // false
console.log(true instanceof Boolean) // false
const a = Symbol('a')
console.log(a instanceof Symbol) // false
const b = BigInt(9007199254740991)
console.log(b instanceof BigInt) // false
```

2. 可以检测Array、Object、RegExp、Date等,但是不准
```ts
// console.log([] instanceof Array) // true
console.log({} instanceof Object) // true
console.log([] instanceof Object)
// 结果true, 这就出错了，主要是因为Array的上层原型对象是Object，但是此处我们并不希望如此结果
```

3. 只要是通过原型链的__proto__能找得到，则返回true

```ts
const app = document.getElementById('#app')
// dom节点的继承关系如下： HTMLDivElement->HTMLElement->Element->Node->EventTarget->Object
console.log(app instanceof HTMLDivElement) // true
console.log(app instanceof HTMLElement) // true
console.log(app instanceof Element) // true
console.log(app instanceof Node) // true
console.log(app instanceof Object) // true
```

## 2. typeof
:::tip
typeof 是JS中最常见的判断数据类型的方式之一，

**局限性在于**
1. typeof只能检测基础数据类型, null、undefined、Symbol、BIgInt、Boolean、Number、string
2. typeof无法检测复杂数据类型，复杂数据类型null、array、object的判断结果均为object，主要是null、array、object的机器码前三位都是000
:::

```ts
console.log(typeof '') // string
console.log(typeof 1) // number
console.log(typeof false) // boolean
console.log(typeof undefined) // undefined
console.log(typeof Symbol('a')) // symbol
console.log(typeof BigInt(9007199254740991)) // bigint

// 针对引用数据类型时，就不尽人意了
console.log(typeof function () {}) // function
console.log(typeof null) // object
console.log(typeof []) // object
console.log(typeof {}) // object
```

## 3. constructor

:::tip
constructor,主要是用于判断构造函数的原型链指向,其次是判断数据类型

**局限性：**
1. 无法判断null、undefined因为它们没有原型
2. 当变量重新赋值时，可能会出现问题
:::

```ts
console.log(1.0.constructor === Number) // true
console.log(''.constructor === String) // true
console.log([].constructor === Array) // true
console.log([].constructor === Object) // false, constructor可以避免instanceof判断数组继承自object的问题
console.log({}.constructor === Object) // true

// 在检测null undefined时直接报错
console.log(null.constructor === null) // TypeError: Cannot read properties of null (reading 'constructor')

// 当原型被改变时，则出错
function Test() {}
// Test.prototype = new Array()
const f = new Test()
console.log(f.constructor === Test) // false
console.log(f.constructor === Array) // true
```

## 4. Object.prototype.toString

:::tip
toString是Object的原型对象方法该方法默认返回其调用者的具体类型，严格来说是toString在运行时this指向对象类型，返回的类型，格式为[object xxx] xxx是指具体的数据类型
<br/>
String,Number,Boolean,Undefined,Null,Function,Date,Array,RegExp,Error,HTMLDocument,... 基本上所有对象的类型都可以通过这个方法获取到。 

[MDN上解释了object.protype.toString 为什么会返回[object Object]](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString#%E6%8F%8F%E8%BF%B0)

:::

```ts
Object.prototype.toString({})
Object.prototype.toString([])
Object.prototype.toString(1)
Object.prototype.toString(Symbol(1))
Object.prototype.toString(() => {})
Object.prototype.toString(null)
Object.prototype.toString(undefined)

// 以上这些都会返回'[object Object]'， 根据上边的解释我们知道toString在调用时this会指向调用者自身，然后返回调用者的数据类型，
// 那么此时的调用方是Object 所以会返回[object Object]
```

**然后我们通过构造函数的方法更改作用域指向（call或者apply）就能拿到调用方的真实数据类型的，无论什么类型的数据**

```ts
const toString = Object.prototype.toString

console.log(toString.call(1)) // [object Number]
console.log(toString.call('')) // [object String]
// eslint-disable-next-line no-useless-call
console.log(toString.call(null)) // [object Null]
// eslint-disable-next-line no-useless-call
console.log(toString.call(undefined)) // [object Undefined]
console.log(toString.call(true)) // [object Boolean]
console.log(toString.call(Symbol(1))) //  [object Symbol]
console.log(toString.call(BigInt(9007199254740991))) //  [object BigInt]

console.log(toString.call([])) //  [object Array]
console.log(toString.call({})) //  [object Object]
console.log(toString.call(() => {})) //  [object Function]
```

## 其他判断方法

- Object.is
主要是判断两个引用数据类型的变量的内存地址是否相同，特殊情况在于Object.is(NaN, NaN),居然返回true

- Array.isArray
判断是否为数组

- isNaN
判断是否为非数字

## 验证方法封装

```ts
const toString = Object.prototype.toString

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined'
}

export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val)
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object')
}

export function isEmpty<T = unknown>(val: T): val is T {
  if (isArray(val) || isString(val))
    return val.length === 0

  if (val instanceof Map || val instanceof Set)
    return val.size === 0

  if (isObject(val))
    return Object.keys(val).length === 0

  return false
}

export function isDate(val: unknown): val is Date {
  return is(val, 'Date')
}

export function isNull(val: unknown): val is null {
  return val === null
}

export function isNullAndUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) && isNull(val)
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val)
}

export function isNumber(val: unknown): val is number {
  return is(val, 'Number')
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export function isString(val: unknown): val is string {
  return is(val, 'String')
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean')
}

export function isRegExp(val: unknown): val is RegExp {
  return is(val, 'RegExp')
}

export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val)
}

export function isWindow(val: any): val is Window {
  return typeof window !== 'undefined' && is(val, 'Window')
}

export function isElement(val: unknown): val is Element {
  return isObject(val) && !!val.tagName
}

export function isMap(val: unknown): val is Map<any, any> {
  return is(val, 'Map')
}
```