---
title: 'object'
---

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