---
title: 'nextTick 源码解析'
---

## 前言

vue DOM 更新采用的是异步的更新策略 每次监听到数据发生变化的时候 不会立即取更新 DOM 而是将这一次更新 DOM 的事件缓存到一个任务队列中
**这样的好处就是可以将多次更新数据的操作合并成一次 并且减少操作 DOM 的次数**

## 作用

nextTick 接收一个回调函数作为参数 这个回调函数会在 DOM 更新之后才执行 因此对基于最新的数据生成的DOM进行操作的时候 可以将改操作放入nextTick中

> [源码地址:](https://github.com/vuejs/vue/blob/main/src/core/util/next-tick.ts)



nextTick 提供了四种异步的方法: `Promise.then`、`MutationObserver`、`setTimeout`、`setImmediate`
前两种是微任务 后两种是宏任务
```js
/* globals MutationObserver */


// noop 表示一个无操作空函数，用作函数默认值，防止传入 undefined 导致报错
import { noop } from 'shared/util'
// handleError 是一个错误处理函数，用于捕获异步操作中的错误
import { handleError } from './error'
//  isIE, isIOS, isNative 环境判断函数，
//  isNative 判断某个属性或方法是否原生支持，如果不支持或通过第三方实现支持都会返回 false
import { isIE, isIOS, isNative } from './env'

export let isUsingMicroTask = false // 标记nextTick是否以微任务执行

// 维持一个回调函数队列
const callbacks: Array<Function> = []

// 用来控制任务队列依次能够推入 event loop 中
let pending = false

// 开始批量执行更新队列的操作
function flushCallbacks() {
  // 恢复等待状态
  pending = false
  // 浅拷贝一份任务队列 并且将任务队列清空
  // 防止在任务队列的回调函数中如果再调用nextTick函数 导致nextTick执行时机错乱的问题 而且可能会出现一直循环的问题
  // nextTick 中 在调用 nextTick 此次的nextTick应该在下一次的时机执行
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).

// 异步支持的方法：
let timerFunc

// 判断当前环境优先支持的异步方法，优先选择微任务
// 优先级：Promise---> MutationObserver---> setImmediate---> setTimeout
// setTimeout 可能产生一个 4ms 的延迟，而 setImmediate 会在主线程执行完后立刻执行
// setImmediate 在 IE10 和 node 中支持

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */

// 判断是否支持Promise
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    // 利用then 将 flushCallbacks 包裹成一个异步的微任务
    p.then(flushCallbacks)
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) setTimeout(noop)
  }
  // 标志为微任务
  isUsingMicroTask = true
} else if (
  // 如果不是ie并且浏览器支持 MutationObserver 也是一个微任务
  !isIE &&
  typeof MutationObserver !== 'undefined' &&
  (isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]')
) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  // 利用 MutationObserver 改变 textNode的文本内容 触发flushCallbacks回调
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    // @see: https://developer.mozilla.org/zh-CN/docs/conflicting/Web/API/MutationObserver/observe_2f2addbfa1019c23a6255648d6526387
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    // 改变内容 触发更新
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  // Fallback to setTimeout.
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

export function nextTick(): Promise<void>
export function nextTick(cb: (...args: any[]) => any, ctx?: object): void
/**
 * @internal
 */
export function nextTick(cb?: (...args: any[]) => any, ctx?: object) {
  // 用于执行nextTick().then的操作
  let _resolve
  // 压入一个回调函数至任务队列中
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e: any) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  // pending 为一个标识符 只有在上一次的timerFunc执行 才能将下一次的任务队列推入到 event loop 中
  if (!pending) {
    pending = true
    timerFunc()
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    // 如果没有传入回调，并且当前环境支持 promise，就返回一个 promise
    // 此时外部通过.then执行的时候 DOM已经更新好了
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}

```


## 参考文献
[nextTick实现原理](https://juejin.cn/post/7087866362785169416)


[mdn MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)