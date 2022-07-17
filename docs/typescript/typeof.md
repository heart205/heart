---
title: typeof
---


## typeof class
typeof 一个class的情况:
```ts
class person {
  name: string
  static s = '1'
  constructor() {
    this.name = 'some'
  }
}

// 这里如果是匿名类的话 属性需要和typeof的类对应
const son: typeof person = class {
  name = '123'
  static s = '2'
  constructor() {
    console.log('')
  }
}

// 如果不是匿名类 则需要这个类是typeof 类的子类
const child: typeof person = class B extends person {
  constructor() {
    super()
  }
}
```