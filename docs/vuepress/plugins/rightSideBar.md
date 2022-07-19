---
title: '右边侧边栏插件开发'
---

## vite 中在 vue 中使用 jsx

需要安装`babel`插件以及 vite 的解析 jsx 的插件

```shell
yarn add  @vitejs/plugin-vue-jsx @vue/babel-plugin-jsx
```

## 全局 ui 插件开发

全局 ui 插件需要在客户端加载 因此要在 `defineClientConfig` 中使用插件
在其配置下的 rootComponents 中加载全局的 ui 组件

```js
defineClientConfig({
  rootComponents: [RightSideBar],
})
```

> 不能加载`vue sfc`文件 没有 `complier` 去给他做转换 因此要加载 js 文件 在 vue2 中可以使用`Vue.extends` 去创建一个子组件 但是在 v3 中
> 使用了 `defineComponent` 代替了`Vue.extends`

@[code ts](../../.vuepress/plugin/rightSideBar/rightSideBar.tsx)

@[code css](../../.vuepress/plugin/rightSideBar/rightSideBar.css)

## 参考资料：

- [plugin-vue-jsx](https://github.com/vitejs/vite/tree/main/packages/plugin-vue-jsx)

- [babel jsx](https://github.com/vuejs/babel-plugin-jsx)

- [vue jsx](https://v3.cn.vuejs.org/guide/render-function.html#jsx)

- [vue jsx 在线转换](<https://vue-jsx-explorer.netlify.app/#const%20App%20%3D%20()%20%3D%3E%20%3Cdiv%3EHello%20World%3C%2Fdiv%3E>)
