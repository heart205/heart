---
title: 继承
---

```js

class A {
  name = 1
  constructor() {
    console.log(this)
  }
  create() {
    console.log(this)
    return this
  }
}

// 类继承的话 B的显式原形链会是 A的一个实例化对象
class B extends A {
  asd = 1
  constructor() {
    super()
  }

  create() {
    super.create()
    console.log(this === super.create())
    console.log(B.prototype.__proto__ === A.prototype)
  }
}

new B().create()
// console.log(Object.getOwnPropertyNames(A.prototype))

```