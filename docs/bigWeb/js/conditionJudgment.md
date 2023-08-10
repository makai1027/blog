--- 
siderbar: 
    title: JS == 和 === 的区别以及条件判断引发的数据类型转换
isTimeLine: true
title: JS == 和 === 的区别以及条件判断引发的数据类型转换
date: 2020-05-12 09:40:00
author: 马凯
tags:
 - 前端
 - JavaScript
categories:
 - 前端
---

# JS == 和 === 的区别以及条件判断引发的数据类型转换

## 异同点

**相同点：**
>  == 和 === 都是条件判断中常用的方式，都能够判断两端是否条件相等

**不同点：**

> 概念上 == 和 === 对比的深浅度不一样，==表示相同，===表示严格相同


### == 判断依据以及使用场景

> **先判断条件两端的操作数是否相等，如果相等则返回true，不判断数据类型, 会发生隐式转换**

**一般==判断的情况如下：**

- 两个都为简单类型，字符串和布尔值都会转换成数值，再比较
- 简单类型与引用类型比较，对象转化成其原始类型的值，再比较
- 两个都为引用类型，则比较它们是否指向同一个对象
- null 和 undefined 相等
- Object.is(NaN, NaN)返回true，特例
- 存在 NaN 则返回 false


### === 判断条件以及使用场景

> **判断数据类型和操作数是否相等，只有在不转换的情况下相等才返回true， 例如 '1' === 1 返回false**

1. 如果类型不同，就不相等

2. 如果两个都是数值，并且是同一个值，那么返回true，如果其中一个是NaN，那么返回false。（判断一个值是否是NaN，只能用isNaN()来判断）

3. 如果两个都是字符串，每个位置的字符都一样，那么相等；否则不相等 。

4. 如果两个值都是true，或者都是false，那么相等。

5. 如果两个值都引用同一个对象或函数，那么相等；否则不相等。

6. 如果两个值都是null，或者都是undefined，那么相等。

## 条件判断中出现的隐式转换

:::tip
隐式转换，是当进行条件判断或者运算符计算时，两边的数据不统一，编译器会自动将两边数据进行数据类型转换成统一类型之后再计算的过程。
:::

### 操作符隐式转换的场景

- **比较运算**

| **运算符** | **描述** |
| -- | -- |
| == | 双等于，操作符相等 |
| === | 全等于，数据类型和操作符相等 |
| != | 不等于 |
| !== | 数据类型和操作符都不相等 |
| > | 大于|
| < | 小于 |
| >= | 大于等于 |
| <= | 小于等于 |

1. **==**
> 类型不同时，两端都会转换为数字Number类型，如果是引用类型先转换为字符串，再转换为数字

```js
console.log(true == 'hello') // false, true转换为1，hello 无法转化数字为NaN，NaN相当于false

console.log('123' == 123) // true

console.log({} == 'hello') // false 相当于NaN 对比 NaN
```

2. **null/NaN/undefined类型和其他数据类型进行比较时，直接转换为false**

```ts
console.log(null == null) // true

console.log(undefined == null) // true

console.log(undefined == undefined) // true

// console.log(NaN == NaN) // false, 特殊的在于使用Object.is(NaN, NaN),返回true
```

3. **!=/==和===/!==**

> != 和 == 判断规则一样，仅对比操作数，不进行原始类型对比<br/>
> == 和 === 判断条件一致，对比数据类型和操作数，不进行隐式转换


4. **>/>=/</<=**
> 如果是非数值，转换为数字再进行对比<br/>
> 如果两端都是字符串，会按照顺序对比每一个字符的Unicode码

```ts
console.log('123123' > '5') // 不发生类型转换，直接对比，返回false

console.log((+'5') < '123123') // 相当于 '123123' > Number(5), 左右都会转换为数字
```

- **一元运算**

| **运算符** | **描述** |
| -- | -- |
| + | 将操作数转化为数字，字符串拼接|
| - | 将操作数转化为数字，再变为负数 |
| ！| 逻辑运算符取反 |
| ++ | 递增 |
| -- | 递减 |

> 一元运算时，+/-/++/--, 都可以将变量转换为Number类型<br/>
> 使用 ！ 则可以将变量转换为boolean

```ts
console.log(+'hello') // NaN
console.log(+'123') // 123
console.log(!'hello') // false

let a = 'hello'
console.log(++a) // NaN

let b = true
console.log(--b) // 0
```

- **二元运算**

| **运算符** | **描述** |
| -- | -- |
| + | 加法 |
| - | 减法 |
| * | 乘法 |
| / | 除法 |
| % | 除余 |


1. 加法 +
**+ 比较特殊，如果是字符串，则返回新字符串，如果不存在字符串则通过隐式转换，返回数字Number**
> a. 都是数字：直接相加<br/>
> b. 含有字符串：把其他的值转换为字符串，再进行拼接<br/>
> c. 没有字符串，也不是数字：都转换为数字Number，在进行拼接<br/>

```js
// 这块我不注释就会被eslint格式化，sorry

console.log(1 + 1) // 2
// console.log(1 + 2 + '1') // '31'
// console.log(true + 'hello') //truehello
console.log(true + undefined) // NaN, 两端会转化为数字
console.log(false + null) // 0

// 引用类型和函数
const test = function () {}
// console.log(test + 's') // function () {}s

console.log({} - 1) // NaN
console.log([1, 2, 3] - true) // NaN ，Number([1,2,3]) = NaN, Number(true) = 1, 所以结果是NaN
console.log([1] - true) // 0 Number([1]) = 1, Number(true) = 1, 所以结果是0
```

2. 减法-、乘法*、除法/、除余%

> 此类二元运算，如果不是数字都会转换为数字在计算

```ts
console.log(true * null) // 0
console.log(false - 'hello') // NaN

console.log({} - 1) // NaN,因为Number({}) 是NaN
console.log([1] % true) // 0
console.log([1] / true) // 1 Number([1]) = 1, Number(true) = 1
```

- **逻辑运算**

| **运算符** | **描述** |
| -- | -- |
| && | 与 |
| \|\| | 或|
| ！ | 非 |

1. 与&&、或||

> 此类都会转换为boolean,再进行逻辑运算，但不一定会返回boolean

> **对于 && **
```ts
// 当第一个表达式为真时，整个表达式的结果取决于第二个表达式，返回第二个表达式，如果没有则返回自身
console.log(true && '你好') // 你好

// 当第一个表达式为假时，直接返回第一个表达式，也就是false
console.log(false && '你好') // false
console.log((10 > 16) && '你好') // false
console.log(undefined && '你好') // undefined
```

> **对于 || **
```ts
// 当第一个表达式为真时，直接返回第一个表达式
console.log(true || '你好') // true
console.log('世界' || '你好') // 世界
console.log((10 < 11) || '你好') // true

// 当第一个表达式为假时，整个表达式的结果取决于第二个表达式，返回第二个表达式，如果没有则返回false
console.log(false || '你好') // 你好
console.log((10 > 16) || '你好') // 你好
console.log(undefined || '你好') // 你好
```

### 自动转换为boolean

> **null/undefined/''/0/NaN**

### 自动转换为字符串
> **字符串 + 任意数据类型都会变成字符串，除了Symbol**


### 自动转换为数字

```ts
'5' - '2' // 3
'5' * '2' // 10
true - 1 // 0
false - 1 // -1
'1' - 1 // 0
'5' * [] // 0
false / '5' // 0
'abc' - 1 // NaN
null + 1 // 1
undefined + 1 // NaN
```


## 强制类型转换

### 其他类型 转化为 字符串

1. toString函数
:::tip
[MDN上解释了object.protype.toString 为什么会返回[object Object]](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString#%E6%8F%8F%E8%BF%B0)
:::

**null、undefined没有toString方法**<br/>

**字符串 + 任意数据类型都会变成字符串，除了Symbol**

```ts
console.log(true.toString()) // 'true'
console.log([].toString()) // ''
console.log({}.toString()) // '[object Object]'
function test() {}
console.log(test.toString()) // 'function test() {}'

const num = 25
// number.toString 接受一个radix参数，表示进制
console.log(num.toString()) // 25
console.log(num.toString(8)) //  8进制下返回 31
console.log(num.toString(2)) //  2进制下返回 11001
console.log(num.toString(16)) //  16进制下返回 19
```

### 其他类型 转化为 boolean
**通过Boolean或者!!转换一下类型， null/undefined/''/0/NaN， 返回都是false** 
1. Boolean方法

```ts
function test() {}
console.log(Boolean(1)) // true
console.log(Boolean('hello')) // true
console.log(Boolean(test)) // true
console.log(Boolean(0)) // false
console.log(Boolean(null)) // false
```

2. !!

```ts
function test() {}
console.log(!!(1)) // true
console.log(!!('hello')) // true
console.log(!!(test)) // true
console.log(!!(0)) // false
console.log(!!(null)) // false
```


### 其他类型 转化为 Number

1. Number方法
```ts
// number转化基本数据类型
console.log(Number(true)) // 1
console.log(Number(null)) // 0
console.log(Number('')) // 0
console.log(Number('123')) // 123
console.log(Number(undefined)) // NaN
console.log(Number(10)) // 10

Number('123') // 123 如果仅包含数值，转换为对应的数值
Number('234.1') // 234.1 解析为对应的小数
Number('+12.1') // 12.1 首位为符号位，其余为为数值，转换为对应的数值
Number('1+2.3') // NaN 符号位出现在其他位置，解析为NaN
Number('0xa') // 10 如果仅包含十六进制格式，转为为对应的十进制的值
Number('010') // 10【注意】不会当做八进制被解析，结果为10。
Number('') // 0 空字符串被转换为0
Number('123ac') // NaN 包含其他字符： NaN
Number(Symbol(1)) // 报错
// Number(Array | Object) // NaN
```

2. parseInt 和 parseFloat

**parseInt()/ parseFloat()会将逐个解析，遇到不能转的字符则停下, 如果是不能解析的则返回NaN**

**parseInt()/ parseFloat() 转换null/undefined/boolean，结果都是NaN**
以parseInt为例子

```ts
console.log(Number.parseInt(true)) // NaN
console.log(Number.parseInt(false)) // NaN
console.log(Number.parseInt('123')) // 123
console.log(Number.parseInt('123asd')) // 123
console.log(Number.parseInt('aa123asd')) // NaN
```