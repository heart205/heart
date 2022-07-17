---
title: 'object'
---
> 自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性
## Object.prototype.hasOwnProperty()

hasOwnProperty 用于判断自身的属性是否有指定的属性 与 `in` 操作符不同 改方法会忽略远行链上继承到的属性

> 即使属性的值是 null 或 undefined，只要属性存在，hasOwnProperty 依旧会返回 true。


## Object.is
- [Object.is mdn](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#description)
Object.is 用于比较两个值是否相等 与
`===` 不同的是 他会比较`+0` 和`-0`
以及`NaN` 的相等情况

> 0 默认是 +0
```js
Object.is(+0,-0) // false

Object.is(NaN, Number.NaN) // true
```

## Object.getOwnPropertyDescriptor()

Object.getOwnPropertyDescriptor() 方法返回指定对象上一个自有属性对应的属性描述符 找不到就是undefined
> [getOwnPropertyDescriptor](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)


> 后续补充笔记

## getOwnPropertyNames

Object.getOwnPropertyNames() 返回一个数组，该数组对元素是 obj自身拥有的枚举或不可枚举属性名称字符串
> for in 会遍历原型链上的属性 `无序遍历对象的可枚举属性。语句针对每个唯一的属性`


> for of 是迭代器属性
`遍历可迭代的对象（包括 数组、类数组对象、迭代器和生成器)，对每个不同属性的属性，调用一个自定义的有执行语句的迭代钩子`


> [getOwnPropertyNames](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)



## propertyIsEnumerable
propertyIsEnumerable() 方法返回一个布尔值，表示指定的属性是否可枚举。