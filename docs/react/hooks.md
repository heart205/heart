---
title: 全量hooks使用介绍
---


## useState
用于保存hooks中的数据持久化 如果不调用`setCount` 方法 则不会改变count的引用值
```tsx
import { useState } from 'react'
const StateDemo = () => {
  const [count, setCount] = useState(0)
  console.log('render state')
  return (
    <>
      <div>{count}</div>
      <button
        onClick={() => {
          setCount((state) => ++state)
        }}
      >
        click add
      </button>
    </>
  )
}
export default StateDemo

```

## useEffect

```tsx
interface Props {
  a: number
  b: number
}
import { useState, useEffect } from 'react'
const useEffectHook = (props: Props) => {
  const [state, setState] = useState(0)
  useEffect(() => {
    // 执行副作用的操作 比如 请求接口 消息的发布订阅 更改DOM等都属于副作用

    // 依赖父节点的a 和 b 每次变更则请求接口 类似于 watch

    setState((count) => count + 1)

    return () => {
      // 清除副作用的操作 比如 清除监听等
    }
  }, [props.a, props.b])

  return state
}

export default () => {
  const [count1, setCount1] = useState(1)
  const [count2, setCount2] = useState(2)
  const [count, setCount] = useState(3)
  const data = useEffectHook({ a: count1, b: count2 })
  return (
    <>
      刷新次数:{data}
      <br />
      count: {count}
      <br />
      <button
        onClick={() => {
          setCount((count) => count + 1)
        }}
      >
        add count
      </button>
      <br />
      <button onClick={() => setCount1((count) => count + 1)}>increased</button>
      <br />
      <button onClick={() => setCount2((count) => count - 1)}>decreased</button>
    </>
  )
}
```


## useCallback

```tsx
interface Props {
  a: number
  b: number
  obj: Record<string, unknown>
}
import { useCallback, useState } from 'react'

// prefixObject 用于验证useState 如果是引用类型时 如果不重新set
// 返回的结果是否一致问题： 没有set 则每次返回相同的引用类型
let prefixObject: Record<string, unknown> | null = null
const useCallbackHooks: React.FC<Props> = (props) => {
  const callFunc = useCallback(() => {
    console.log(props.a + props.b)
  }, [props.a, props.b])

  if (prefixObject === null) {
    prefixObject = props.obj
  } else {
    console.log(prefixObject === props.obj)
  }
  callFunc()
  return <></>
}

export default () => {
  const [count1] = useState(1)
  const [count2] = useState(2)
  const [count, setCount] = useState(0)
  const [object] = useState({})
  return (
    <>
      {useCallbackHooks({
        a: count1,
        b: count2,
        obj: object,
      })}
      count: {count}
      <button
        onClick={() => {
          setCount((count) => count + 1)
        }}
      >
        count add
      </button>
    </>
  )
}
```


> `useCallback(fn, deps) `相当于 ` useMemo(() => fn, deps)`
## useMemo
> `useMemo(fn, deps)` 类似于计算属性 如果`deps`的依赖值不变 则`useMemo`的返回值不会变 可以使用`useMemo`进行高开销的计算
```tsx
interface Props<T> {
  a: T
  b: T
}
import { useMemo, useState } from 'react'
const useMemoHook = (props: Props<number>) => {
  return useMemo(() => {
    return props.a + props.b
  }, [props.a, props.b])
}

export default function () {
  const [count1, setCount1] = useState(1)
  const [count2, setCount2] = useState(2)
  const [count, setCount] = useState(3)
  const data = useMemoHook({ a: count1, b: count2 })
  return (
    <>
      {data}
      <br />
      count: {count}
      <br />
      <button
        onClick={() => {
          setCount((count) => count + 1)
        }}
      >
        add count
      </button>
      <br />
      <button onClick={() => setCount1((count) => count + 1)}>increased</button>
      <br />
      <button onClick={() => setCount2((count) => count - 1)}>decreased</button>
    </>
  )
}
```

## useReducer

> 如果 Reducer Hook 的返回值与当前 state 相同(使用了Object.is 比较两个值是否相等)，React 将跳过子组件的渲染及副作用的执行。


```tsx
import { useReducer } from 'react'

interface reducer {
  type: 'increased' | 'decreased'
}

const reducer = (state: number, action: reducer) => {
  switch (action.type) {
    case 'increased': {
      return state + 1
    }
    case 'decreased': {
      return state - 1
    }
    default: {
      throw new Error(`Invalid action`)
    }
  }
}

const Reducer = () => {
  const [state, dispatch] = useReducer(reducer, 0)
  return (
    <>
      {state}
      <button
        onClick={() => {
          dispatch({ type: 'increased' })
        }}
      >
        increased
      </button>
      <button onClick={() => dispatch({ type: 'decreased' })}>decreased</button>
    </>
  )
}

export default Reducer

```



可以穿入第三个参数进行惰性初始化
第三个参数的定义:
```tsx
  function useReducer<R extends ReducerWithoutAction<any>, I>(
        reducer: R,
        initializerArg: I,
        initializer: (arg: I) => ReducerStateWithoutAction<R>
    ): [ReducerStateWithoutAction<R>, DispatchWithoutAction];
```
说明是一个函数 这个函数会将第二个参数作为形参穿入 函数的返回值会是作为state的初始值
```tsx{21-26}
import { useReducer } from 'react'

interface reducer {
  type: 'increased' | 'decreased'
}

const reducer = (state: number, action: reducer) => {
  switch (action.type) {
    case 'increased': {
      return state + 1
    }
    case 'decreased': {
      return state - 1
    }
    default: {
      throw new Error(`Invalid action`)
    }
  }
}

const initStateFunc = (count: number) => {
  if (count === 0) {
    return 99
  }
    return count
}

const Reducer = () => {
  // 惰性初始化
  const [state, dispatch] = useReducer(reducer, 0, initStateFunc)
  return (
    <>
      {state}
      <button
        onClick={() => {
          dispatch({ type: 'increased' })
        }}
      >
        increased
      </button>
      <button onClick={() => dispatch({ type: 'decreased' })}>decreased</button>
    </>
  )
}

export default Reducer

```