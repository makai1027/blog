---
sidebar:
 title: 如何实现继承以及继承的方式有哪些？
 step: 10
isTimeLine: true
title: 如何实现继承以及继承的方式有哪些？
date: 2020-08-11
tags:
 - 前端
 - JavaScript
categories:
 - 前端
---

# 如何实现继承以及继承的方式有哪些？

## 什么是继承？

所谓继承就类似子女继承父母的财产，子女也有支配使用权，例如父母的汽车，子女可以使用。

那么拿到JavaScript中就是如果类**型**A继承了**类型B**的所有属性及方法，那么**类型A**则为**类型B**的子类，**类型B**则为**类型A**的父类。

继承的优点就在于子类能够继承父类的属性及方法，不需要重复编写。

:::tip
在之前的文章（原型和原型链）中，我们已经讲到了原型和原型链的概念。

你可以理解为JavaScript的每一个对象都有一个属性__proto__，这个属性指向的是该对象的原型。**除了null，null属于顶层原型**，那么这个__proto__就是用于链接继承关系的。差不多所有的数据类型包括内置属性都是继承自Object，所以你会发现function、array、Date他们都有Objec的属性和方法。

我们在提一嘴原型，
* 原型：每一个JavaScript对象都有一个原型对象prototype， 严格来说prototype仅用于指向原型对象。原型对象包含了该对象的属性和方法。当我们访问一个对象的属性或者方法时，JavaScript引擎会先对对象本身的属性查找，如果找不到，还会在对象的原型上，以及该对象原型的原型，依次层层查找，直到找到该属性或者找到原型链的末尾null，则停止。

在继承后你会发现，你写的某个对象或者函数，本身没有你要用的属性或者方法，继承之后即使未声明亦可使用。
:::


### 举个例子
```ts
// 创建一个array的实例
// eslint-disable-next-line unicorn/no-new-array
const array = new Array(7)

array.slice(0, 1)
array.push(0)
array.concat([0, 1])

// 子类可以使用所有的array的属性
```
这个例子只能说明继承原型对象的属性方法，没有自身的属性方法，再举一个例子，在原有的基础上进行扩展。

```js
// 定义一个构造函数
function Person(name) {
  // this.xxx一般是构造函数的实例属性以及方法
  this.name = name
}
// 在构造函数的原型对象上添加一个方法
Person.prototype.say = function () {
  console.log(`我的名字叫${this.name}`)
}
Person.prototype.bar = '这是个狗'

function Student(name) {
  // 使用构造函数方法继承Person的实例属性以及方法
  Person.call(this, name)
  //   添加自身的实例方法
  this.tele = function () {
    console.log('110')
  }
}
// 使用原型链继承，继承Person的原型链属性及方法
Student.prototype = new Person()

// 创建一个Student的实例
const child = new Student('好人')

console.log(child.bar) // 这是个狗, 来自继承Person的原型链属性
console.log(child.say()) // 我的名字是好人， 来自继承Person的原型链的方法
console.log(child.name) // 好人，来自Person的实例属性
console.log(child.tele()) // 110，来自Student自身的实例方法

console.log(child.__proto__ === Student.prototype) // true, 说明child是Student的实例，部分方法继承自Student
console.log(child.__proto__.__proto__ === Person.prototype) // true, 说明实例child先继承Student，又继承Person
console.log(Student.prototype) // 打印的结果是Person
```
以上测试结果发现，继承能够对自身实例属性和方法、原型链属性和方法进行扩展，得到非自身包含的属性及方法。

JavaScript的继承机制使用原型链来实现对象之间的继承关系。通过继承，子对象可以获取父对象的属性和方法，并且可以添加自己的特定功能。原型继承是基于对象的，通过修改原型对象，所有继承自该原型的对象都会受到影响。ES6中引入的类和继承语法使得JavaScript中的继承更加易于理解和使用。

## 函数的属性和方法

:::tip
原型链的属性和方法分为三类；
* 私有属性和方法
* 实例属性和方法*
* 原型链属性和方法
:::

```ts
function Foo() {
  const name = 'name' // 私有基本数据类型
  const object = {} // 私有引用数据类型
  function func() {} // 私有方法
  // 私有方法和属性只能在函数的作用域范围内调用

  this.hobby = '唱跳rap' // 实例基本数据类型属性
  this.target = {} // 实例引用数据类型属性
  this.bar = function () {} // 实例方法
  // 实例属性及方法会在构造函数实例化后进行使用，但是引用数据类型会造成数据共享
}

Foo.prototype.car = '特斯拉' // 原型链属性
Foo.prototype.say = function () {} // 原型链方法

// 原型链的属性和方法只能通过继承获得
```

## 实现继承的7种方法
> es5，中有六种继承方法，es6则通过class的extend方法继承

* 原型链继承
* 借用构造函数继承
* 组合式继承
* 原型式继承
* 寄生式继承
* 寄生组合式继承
* es6 class extend继承

### 原型链继承

> 优点： 简单、易于实现<br/>
> 缺点：1. 原型对象内如果有引用数据类型容易造成数据污染， 2. 无法向构造函数传值

```ts
function Foo() {
  this.array = []
}

Foo.prototype.say = function () {
  console.log(this.array)
}

function Student() {}
Student.prototype = new Foo()

const child = new Student()

child.array.push(1)
child.say() // [1]

const child2 = new Student()
child2.array.push(2)
child2.say() // [1, 2]
```

### 借用构造函数继承

> 优点：1. 能够向构造函数传值， 2. 避免了构造函数内引用数据类型的实例属性数据共享<br/>
> 缺点：实例方法无法共用，造成每构建一个实例都会产生一个新的实例方法，如果过多造成内存压力

```ts
function Person(likes = []) {
  this.hobbys = likes
  this.say = function () {
    console.log(this.hobbys)
  }
}

function Student(likes) {
  Person.call(this, likes)
}

const child1 = new Student(['足球'])
child1.hobbys.push('篮球')
child1.say() // ['足球','篮球']

const child2 = new Student(['羽毛球'])
child2.say() // ['羽毛球']

console.log(child1.say === child2.say) // false
```


### 组合式继承

> 优点：1. 能够向构造函数传值 2. 避免了引用数据类型实例属性的数据共享 3. 避免了实例方法的重复创建
> 缺点：引用了两次构造函数

```ts
function Person(likes = []) {
  this.hobbys = likes
}

Person.prototype.say = function () {
  console.log(this.hobbys)
}

function Student(likes = []) {
  Person.call(this, likes)
}

Student.prototype = new Person()

const child1 = new Student(['足球'])
child1.hobbys.push('篮球')
child1.say() // ['足球','篮球']

const child2 = new Student(['羽毛球'])
child2.say() // ['羽毛球']

console.log(child1.say === child2.say) // true
```

### 原型式继承

> 优点：简单<br/>
> 缺点： 1. 引用数据类型实例属性数据共享 2. 没有共同性全都是复制 

```ts
function create(target) {
  function F() {}
  F.prototype = target
  return new F()
}

const object = {
  name: '测试',
  hobbys: ['足球', '篮球'],
  say() {
    console.log(this.hobbys)
  }
}

const test = create(object)

test.hobbys.push('乒乓球')
test.say() // ['足球', '篮球', '乒乓球']
// 问题一，数据共享
object.say() // ['足球', '篮球', '乒乓球']

// 问题二。没有共用属性全都是复制
console.log(test.say === object.say) // true
```

### 寄生式继承

寄生式继承根原型式继承的区别就在于，他在原型式继承的基础上新增了自定义实例属性和方法。
> 优点：简单,对原型式继承二次封装，使其能够创建自定义属性以及方法<br/>
> 缺点： 1. 引用数据类型实例属性数据共享 2. 没有共同性全都是复制 

```ts
function create(target) {
  function F() {}
  F.prototype = target
  return new F()
}

function copy(target) {
  const clone = create(target)
  clone.sport = function () {
    console.log('一起运动吧')
  }
  clone.age = 12
  return clone
}

const object = {
  name: '测试',
  hobbys: ['足球', '篮球'],
  say() {
    console.log(this.hobbys)
  }
}

const test = copy(object)
test.hobbys.push('乒乓球')
test.say() // ['足球', '篮球', '乒乓球']
test.sport() // 一起运动吧
console.log(test.age) // 12

// 问题一，数据共享
object.say() // ['足球', '篮球', '乒乓球']

// 除了新增了实例的属性以及方法没有区别
```

### 寄生组合式继承

寄生组合式继承是es5中最完美的继承方式，避免了前边五种继承方式的所有缺点，继承了他们的优点。

```ts
function create(target) {
  function F() {}
  F.prototype = target
  return new F()
}

function mergePrototype(child, parent) {
  child.prototype = create(parent.prototype)
  // 将子类的原型指向子类的的构造函数
  child.prototype.constructor = child
}

function Person(likes = []) {
  this.hobbys = likes
}

Person.prototype.say = function () {
  console.log(this.hobbys)
}

function Student(likes = []) {
  Person.call(this, likes)
}

mergePrototype(Student, Person)

const child1 = new Student(['足球'])
child1.hobbys.push('篮球')
child1.say() // ['足球','篮球']

const child2 = new Student(['羽毛球'])
child2.say() // ['羽毛球']

console.log(child1.say === child2.say) // true
```


## 引申问题

* 以寄生组合式继承为例，Student虽然通过一系列的继承方法，继承了Person的实例属性和原型链方法，但是为什么Student.__proto__为什么不是Person.prototype呢？反而是匿名函数anymous？？


