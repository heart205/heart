---
title: 'ref'
---

## Ref

普通的ref使用：
```jsx
import { useRef,useEffect } from 'react'
export default function() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    // 拿到ref的所转发的dom值
    console.log(ref.current)
  })
  return <>
  <div ref={ref}></div>
  </>
}
```

class类中的ref则使用 `React.createRef` 创建
```jsx

```


## Ref透传

> 前置： classButton的组件:

```tsx
import React from 'react'
import PropTypes from 'prop-types'
interface Props {
  text?: string
}
export default class Button extends React.Component<Props> {
  static propTypes: Record<string, any>
  handleClick = () => {
    console.log(this)
  }
  render() {
    return (
      <>
        <button onClick={this.handleClick}>{this.props.text || ''}</button>
      </>
    )
  }
}

Button.propTypes = {
  text: PropTypes.string,
}
```

在`HOC`的模式中 `key`和`ref` 都是经过react处理的不会传入组件中 因此不能使用props的方式进行参数透传
```tsx
import React, { useRef, useEffect } from 'react'
import ClassButton from '../../components/button/class'

interface FactoryButtonInterface {
  [props: string]: any
}

class FactoryButton extends React.PureComponent<FactoryButtonInterface> {
  render() {
    return <ClassButton {...this.props} />
  }
}

const useCommonRef = () => {
  const ref = useRef<FactoryButton>(null)
  useEffect(() => {
    console.log(ref.current)
  }, [])
  return (
    <>
      <button
        onClick={() => {
          console.log(ref)
        }}
      >
        get ref
      </button>
      {/* 透传text 但是不能透传ref */}
      <FactoryButton ref={ref} text='第一个测试' />
    </>
  )
}
```

此时点击 按钮`get ref` 可以打印获取到的组件 结果是：`FactoryButton`这个组件

```js
{current: FactoryButton}
```

高阶组件显然不能直接使用`ref`进行组件转发 因此可以使用官方提供的`forwardRef` 进行组件透传转发

```tsx
interface CommonObject {
  text?: string
  [props: string]: any
}

// 由于在HOC中 像key和ref这种都是由react 特殊处理过的 无法和props的其他属性值一样进行透传
// https://zh-hans.reactjs.org/docs/react-api.html#reactforwardref
const ForwardRef = React.forwardRef<ClassButton, CommonObject>((props, ref) => {
  // displayName 命名
  ForwardRef.displayName = `ClassButton${ForwardRef.displayName}`

  return <ClassButton {...props} ref={ref} />
})

export default () => {
  const ref = useRef<ClassButton>(null)
  useEffect(() => {
    console.log(ref.current?.handleClick())
  }, [])
  return (
    <>
      <ForwardRef text={'forwardRef'} ref={ref} />
    </>
  )
}
```

此时点击 按钮`forwardRef`打印出来的便是`classButton` 组件的信息了
```jsx
Button {props: {…}, context: {…}, refs: {…}, updater: {…}, handleClick: ƒ,}
```



## forwardRef 源码解析：

