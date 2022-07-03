---
title: 'object'
---

## Object.prototype.hasOwnProperty()

hasOwnProperty 用于判断自身的属性是否有指定的属性 与 `in` 操作符不同 改方法会忽略远行链上继承到的属性

> 即使属性的值是 null 或 undefined，只要属性存在，hasOwnProperty 依旧会返回 true。
