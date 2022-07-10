---
title: watch的使用
---

## watch 的几种使用方法

[watch docs](https://cn.vuejs.org/v2/api/#vm-watch)

1. 普通使用方法：
```js
export default {
  watch: {
    // watch的值发生变化触发的函数
    dataValue() {
      // code ....
    }
  }
}
```



2. 设置立即执行和深度监听方法
```js
export default {
  watch: {
    dataValue: {
      // watch改变触发的回调函数
      handler() {

      },
      // 设置立即执行 回调将会在侦听开始之后被立即调用
    immediate: true,
    // 深度监听
    deep: true
    }
  }
}
```

3. 一个watch对象可以触发多个函数执行
```js
export default {
  watch: {
    dataValue: [
      'handler',
      function handler2() {},
      {
        handler() {},
        immediate: true,
        deep: true
      }
    ]
  }
}
```


4. 动态监听watch
```js
export default {
  // 不能在beforeCreate中动态监听 因为此时的watch还没有初始化完成
  create() {
    // 动态watch的第一个参数可以接受为一个函数 第二个参数为触发事件的回调函数
    // 第三个参数为是否深度监听等的配置参数
    // 动态watch回返回一个函数 执行该函数可以销毁watch
   const unWatch = this.$watch(() => {
      return dataValue.options
    }, () => {
      // callback
    }, {
      immediate: true,
      deep: true
    })
    this.unWatchList.push(unWatch)
  },
  beforeDestroy() {
    // 销毁watch
    this.unWatchList.forEach((unWatch) => {
      unWatch()
    })
  }
}
```