--- 
siderbar: 
    title: JS 中字符串的常用方法
isTimeLine: true
title: JS 中字符串的常用方法
date: 2020-05-11 09:40:00
author: 马凯
tags:
 - 前端
 - JavaScript
categories:
 - 前端
---

# JS 中字符串的常用方法

## 方法分类
- 字符串-拼接|新增 
>  concat | repeat | padStart | padEnd
- 字符串-截取 
> slice | substr | substring
- 字符串-查询 
> indexOf | includes | match | matchAll | search | at | charAt | charCodeAt | codePointAt | startsWith | endsWith
- 字符串-处理 
> split | trim | trimLeft | trimRight | toLowerCase | toUpperCase 
- 字符串-替换 
> replace | replaceAll


## concat

> 类似于数组的字符串拼接方法,用于拼接一个或者多个字符串，该方法不会更改原字符串，拼接后会返回新的字符串

```js
const str1 = 'hello'
const str2 = 'worl'
console.log(str1.concat(str2)) // helloworld

// 使用方法：string.concat(str1, str2, ..., strx)
// 将一个或多个字符串拼接并返回新字符串
```

## repeat
> 方法构造并返回一个新字符串，其中包含指定数量的所调用的字符串副本，这些副本连接在一起。

> ⚠️ count不能为负数否则会报错

```ts
// string.repeat(count)
// count 介于 0 和 +Infinity 之间的整数。表示在新构造的字符串中重复了多少遍原字符串。
// count也可以是数字字符串

console.log('0'.repeat(2)) // 00
console.log('0'.repeat('2')) // 00
```

## padStart

> 字符串填充，方法用另一个字符串填充当前字符串（如果需要会重复填充），直到达到给定的长度。填充是从当前字符串的开头开始的。

```ts
// str.padStart(targetLength) // str自身填充，如果targetLength小于str的length则不需要填充
// str.padStart(targetLength, padString)

const str = '0123456789'

str.padStart(5) // 0123456789

str.padStart(20) // (10个空格)0123456789

str.padStart(20, '*') // (10个*)0123456789
```

## padEnd

> 字符串的尾部填充，从字符串的最后一个开始填充到目标长度，如果长度小于原字符串长度则不填充

```ts
padEnd(targetLength) // 第二个参数默认为空格
padEnd(targetLength, padString)

const str = '0123456789'

str.padEnd(5) // 0123456789

str.padEnd(20) // 0123456789(10个空格)

str.padEnd(20, '*') // 0123456789(10个*)
```


## slice
> 方法提取某个字符串的一部分，并返回一个新的字符串，且不会改动原字符串。

```ts
// 使用示例：string.slice(startIndex, ?endIndex)
// startIndex不穿默认为 0 , 可以是负数，如果是负数则倒叙截取

const str = '0123456789'

console.log(str.slice(8)) // 返回89,

console.log(str.slice(-8)) // 返回23456789

console.log(str.slice(1, 5)) // 返回1234，表示截取到第5个索引，但不包括

console.log(str.slice(2, -2)) // 234567 截取第3个字符到倒数第2个字符
```

## strstr
该方法在mdn即将废弃。
> 字符串截取，从指定索引开始截取一定长度, 第二个参数为截取长度  length，如果不穿则默认从开始索引截取到最后一个，返回新字符串

> 第二个参数length不能为负数

```ts
// str.substr(startIndex, length)

const str = '0123456789'

console.log(str.substr(6)) // 6789

console.log(str.substr(1, 5)) // 12345

console.log(str.substr(8, 4)) // 89

console.log(str.substr(-1, 4)) // 9 如果索引是负数，表示从倒数第n个开始，向右截取length个
```

## substring

> substring() 方法返回一个字符串在开始索引到结束索引之间的一个子集，或从开始索引直到字符串的末尾的一个子集。

> substring的两个参数均不可以为负数

```ts
// 使用方式：str.substring(indexStart[, indexEnd])

const str = '0123456789'

console.log(str.substring(1, 4)) // 123

console.log(str.substring(1)) // 123456789
```

## indexOf
> indexOf() 方法在字符串中搜索指定子字符串，并返回其第一次出现的位置索引

```ts
// 使用方式：str.indexOf(searchValue, position)
// searchValue 表示需要查询的字符串，任意值都会被转化为字符串，理论上不能使用正则
// position 表示字符串第一次出现的索引大于等于position，否则返回-1， 成功则返回大于或等于position的值
const str = '123123'

console.log(str.indexOf('12')) // 0

console.log(str.indexOf('2')) // 1

console.log(str.indexOf('2', 3)) // 4

console.log(str.indexOf('2', 5)) // -1 因为2共出现两次，一次是索引1 一次是索引4， 1,4并非大于等于5
```

## includes
> includes() 方法执行区分大小写的搜索，以确定是否可以在一个字符串中找到另一个字符串，并根据情况返回 true 或 false。

```ts
// 使用方式：str.includes(searchValue, position)
// searchValue 表示需要查询的字符串，不能是正则表达式。
// position 表示开始查询的起始索引，跟indexOf的position差不多

const str = '123123'

console.log(str.includes('12')) // true

console.log(str.includes('2')) // true

console.log(str.includes('2', 3)) // true

console.log(str.includes('2', 5)) // false 因为2共出现两次，一次是索引1 一次是索引4， 从索引5开始并不能找到2
```

## match
> match() 方法检索字符串与正则表达式进行匹配的结果。

```ts
// string.match(regexp), 只接受一个参数正则，返回一个匹配的数组

const str = 'Hello World'

console.log(str.match(/[A-Z]/g)) // ['H', 'W'],目的在于匹配大写字母

console.log(str.match())
// 或
console.log(str.match(/(?:)/)) // 都会返回 ['', index: 0, input: 'Hello World', groups: undefined]

console.log(str.match('ell')) // ['ell', index: 0, input: 'Hello World', groups: undefined],这个时候ell会自动转化为正则
```

## matchAll

> matchAll() 方法返回一个迭代器，该迭代器包含了检索字符串与正则表达式进行匹配的所有结果（包括捕获组）。

> 第一个参数是正则，如果不包含g标识，则会提示错误

```ts
// string.matchAll(regexp), 只接受一个参数正则，返回一个匹配的正则迭代器

const str = 'Hello World'

console.log([...str.matchAll(/[A-Z]/g)]) // 目的在于匹配大写字母
// 返回结果如下
/**
 * [
 *  ['H', index: 0, input: 'Hello World', groups: undefined, length: 1],
 *  ['W', index: 0, input: 'Hello World', groups: undefined, length: 1]
 * ]
*/
```
## search
> search() 方法执行正则表达式和 String 对象之间的一个搜索匹配。

```ts
const str = 'Hello World'

console.log(str.search(/[A-Z]/g)) // 0 因为第一个字母就是大写的H

console.log(str.search('o')) // 4, 自动将'o'转化为正则
```

## at
> at() 方法接受一个整数值，并返回一个新的 String，该字符串由位于指定偏移量处的单个 UTF-16 码元组成。该方法允许正整数和负整数。负整数从字符串中的最后一个字符开始倒数。

```ts
// 使用方式：string.at(index)

const str = 'Hello World'

console.log(str.at(3)) // l
```

## charAt

> 该方法与at方法类似，都是返回index索引对应的字符， index为负数或者index大于str的length-1，则返回空字符

```ts
// 使用方式：string.charAt(index)

const str = 'Hello World'

console.log(str.charAt(3)) // l

console.log(str.charAt(-1)) // ''
```

## charCodeAt

> charCodeAt() 方法返回 0 到 65535 之间的整数，表示给定索引处的 UTF-16 代码单元
> index 必须大于等于0，小于字符串长度
> 常用于将字符串转化为数字
```ts
// 使用方式：string.charCodeAt(index)

const str = 'Hello World'

console.log(str.charCodeAt(3)) // 对应的字符为l，l的Unicode值为108

console.log(str.charCodeAt(-1)) // 'NaN' 因为-1对应的字符不存在

console.log(str.charCodeAt(0)) // 对应的字符为H，l的Unicode值为72
```

## codePointAt

> codePointAt() 方法返回 0 到 65535 之间的整数，表示给定索引处的 UTF-16 代码单元
> index 必须大于等于0，小于字符串长度
> 常用于将字符串转化为数字
```ts
// 使用方式：string.codePointAt(index)

const str = 'Hello World'

console.log(str.codePointAt(3)) // 对应的字符为l，l的Unicode值为108

console.log(str.codePointAt(-1)) // undefined 因为-1对应的字符不存在

console.log(str.codePointAt(0)) // 对应的字符为H，l的Unicode值为72
```

## startsWith/endsWith
> startsWith() 方法用来判断当前字符串是否以另外一个给定的子字符串开头，并根据判断结果返回 true 或 false。<br/>
> startPosition 在 str 中搜索 searchString 的开始位置，默认值为 0。

> endsWith() 方法用于判断一个字符串是否以指定字符串结尾，如果是则返回 true，否则返回 false。<br/>
> endPosition 预期找到 searchString 的末尾位置（即 searchString 最后一个字符的索引加 1）。默认为 str.length。
```ts
// startsWith(searchString, startPosition)
// endsWith(searchString, endPosition)

const str = 'Hello World'

console.log(str.startsWith('H')) // true
console.log(str.startsWith('H', 1)) // false 因为从索引1，开始找不到H
console.log(str.startsWith('e', 1)) // true 因为从索引1，刚好是e

console.log(str.endsWith('d')) // true
console.log(str.endsWith('l', 8)) // false 因为从索引0到8字符串为'Hello Wo'并不是d结尾, endPosition表示length
console.log(str.endsWith('l', 10)) // true 因为从索引0到9字符串为'Hello Worl'
```

## split

> split() 方法接受一个模式，通过搜索模式将字符串分割成一个有序的子串列表，将这些子串放入一个数组，并返回该数组。

```ts
// 使用方式：string.split(分割规则, limit?)
// limit表示返回数组的长度

const str = '0 1 2 3'

console.log(str.split(' ')) // ['0','1','2','3']

console.log(str.split()) // ['0',' ','1',' ','2',' ','3']

console.log(str.split('', 2)) // ['0',' ']
```


## trim/trimStart/trimEnd
> 删除字符串两端的空格

```ts
const str = ' nihao '

console.log(str.trim()) // 'nihao'
console.log(str.trimStart()) // 'nihao '
console.log(str.trimEnd()) // ' nihao'
```


## toLowerCase/toUpperCase

> 字符串转大小写

```ts
const str = 'Abc'

str.toLowerCase() // abc

str.toUpperCase() // ABC
```


## replace/replaceAll

> replace() 方法返回一个新字符串，其中一个、多个或所有匹配的 pattern 被替换为 replacement。pattern 可以是字符串或 RegExp，replacement 可以是字符串或一个在每次匹配时调用的函数。如果 pattern 是字符串，则只会替换第一个匹配项。原始的字符串不会改变。

> replaceAll() 方法返回一个新字符串，其中所有匹配 pattern 的部分都被替换为 replacement。pattern 可以是一个字符串或一个 RegExp，replacement 可以是一个字符串或一个在每次匹配时调用的函数。原始字符串保持不变。

> replace(/reg/g, '') 相当于 replaceAll(/reg/, '')

```ts
const str = 'Hello World'

console.log(str.replace(/[A-Z]/g, '-')) // -ello -orld
console.log(str.replaceAll(/[A-Z]/g, '-')) // -ello -orld

console.log(str.replace('l', '-')) // 'He-lo World'
console.log(str.replaceAll('l', '-')) // 'He--o Wor-d'
```