---
title: 'vite v3 svg'
---

使用 svg 的几种方法:

1. 通过 img 直接引入

```js
<img src="../../assets/svg/refresh.svg" />
```

2. 通过`vite 插件`引入

vite 配置插件:

```js
export default defineConfig({
  plugins: [
    vue(),
    // https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md
    createSvgIconsPlugin({
      iconDirs: [path.resolve(__dirname, './src/assets/svg')],
      symbolId: 'icon-[name]', //生成的格式
      inject: 'body-last',
      customDomId: '__svg__icon__dom__',
    }),
  ],
})
```

在 `main.ts` 中注册

```js
import 'virtual:svg-icons-register'
```

之后便可以注册一个 svg 的通用组件

```vue
<script setup lang="ts">
import { computed, defineProps, PropType } from 'vue'

//
const props = defineProps({
  prefix: {
    type: String as PropType<string>,
    default: 'icon',
  },
  name: {
    type: String as PropType<string>,
    required: true,
  },
  color: {
    type: String as PropType<string>,
    default: '#333',
  },
  width: {
    type: String as PropType<string>,
    default: '20px',
  },
  height: {
    type: String as PropType<string>,
    default: '20px',
  },
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <svg aria-hidden="true" :width="width" :height="height">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>
```

在其他文件中动态引入 svg

```vue
<script setup lang="ts">
// 使用svg loader
// 引入注册的SvgIcon组件
import SvgIconVue from '../../components/svgIcon.vue'
</script>

<template>
  <div class="loader-svg">
    <SvgIconVue name="refresh" color="red" height="20px" width="20px" />
  </div>
</template>
```
