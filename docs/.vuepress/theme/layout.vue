<script setup lang="ts" name="Layout">
import SideBar from './sidebar.vue'
import { title } from './config'
import { shallowReactive, ref, onMounted } from 'vue'
interface titles {
  type: string
  text: string
  children: Array<titles> | null
}
interface VNode<T> {
  $el: T
}
type T = HTMLCollection | null

const backgroundArray = [
  ['hsl(104, 100%, 85%) 0%', 'hsl(24, 100%, 85%) 100%'],
  ['hsl(63, 100%, 85%) 0%', 'hsl(233, 100%, 85%) 100%'],
  ['hsl(53, 100%, 85%) 0%', 'hsl(133, 100%, 85%) 100%'],
]

const titles = shallowReactive<Array<titles>>([])

const container = ref<VNode<HTMLHeadElement>>(null!)

const backgroundStyle = ref<{ background: string }>({
  background: '',
})

function inferTitleNumber(title: string): number {
  const reg = /H([1-6])/
  if (reg.test(title)) {
    return Number.parseInt(RegExp.$1)
  }
  return NaN
}

function addTitle(num: number, text: string) {
  const obj = {
    type: `H${num}`,
    text,
    children: null,
  }
  if (titles.length === 0) {
    titles.push(obj)
    return
  }
  let tree: titles = titles[titles.length - 1] // 最终的树
  let result: titles | null = null
  while (true) {
    const len = inferTitleNumber(tree.type)
    if (len >= num) {
      break
    }
    result = tree
    if (tree.children) {
      tree = tree.children[tree.children.length - 1]
    } else {
      break
    }
  }
  if (result !== null) {
    if (!result.children) result.children = []
    result.children.push(obj)
  } else {
    titles.push(obj)
  }
}

function setupBackGroundColor(arr: Array<string[]>) {
  const radom = Math.floor(Math.random() * arr.length)
  backgroundStyle.value.background = `linear-gradient(
    to left bottom,
    ${arr[radom].join(',')}
  )`
}
function setupSideBar() {
  // 获取侧边栏状态栏
  const total = ['H1', 'H2', 'H3', 'H4', 'H5']
  const main = document.querySelector('main.flex-1')
  if (
    main.hasChildNodes() &&
    main.children[main.children.length - 1].hasChildNodes()
  ) {
    const titleCollection = main.children[main.children.length - 1].children
    console.log(main.children)
    console.log(titleCollection)
    // 用树的前序遍历来写到时候
    if (titleCollection) {
      for (let i in titleCollection) {
        if (titleCollection[i] instanceof HTMLHeadingElement) {
          const index = inferTitleNumber(titleCollection[i].nodeName)
          if (!isNaN(index)) {
            addTitle(index, titleCollection[i].getAttribute('id')!)
          }
        }
      }
    }
  }
}
onMounted(() => {
  setupSideBar()
  console.log(titles)
  setupBackGroundColor(backgroundArray)
})
</script>
<template>
  <div>
    <div class="heart-main bgc">
      <div class="h-bgc" :style="backgroundStyle">
        <div class="absolute span center">
          <span>{{ title }}</span>
          <p>
            <img
              class="emoji"
              src="https://github.githubassets.com/images/icons/emoji/unicode/1f3a8.png"
              alt="art"
            />
            personal website
          </p>
        </div>
      </div>
    </div>
    <div class="container">
      <div :class="{ 'side-bar': titles.length !== 0 }">
        <template v-for="(item, index) in titles" :key="index">
          <SideBar :titles="item" />
        </template>
      </div>
      <main class="flex-1">
        <Content ref="container" />
      </main>
    </div>
  </div>
</template>

<style>
:root {
  --left-color: #e883a5;
  --right-color: #e18a4e;
  --color: #34495e;
}
</style>
<style scoped>
.heart-main {
  position: relative;
  animation: color-change 8s linear infinite alternate;
  height: 100vh;
}
.img-main {
  position: absolute;
  width: 600px;
  left: 15px;
  top: 50%;
  transform: translateY(-30%);
  object-fit: contain;
}
.custom-shape-divider {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.custom-shape-divider svg {
  position: relative;
  display: block;
  width: calc(131% + 1.3px);
  height: 290px;
}

.shape-fill {
  fill: #ffffff !important;
}

@keyframes color-change {
  from {
    filter: hue-rotate(36deg);
  }
}
.container {
  display: flex;
}
.side-bar {
  font-size: 14px;
  width: 200px;
  border-right: 1px solid var(--c-border);
  margin-right: 40px;
  padding: 1.8rem 0;
  transition: all 0.3s ease;
}
@media screen and (max-width: 768px) {
  .side-bar {
    width: 0px;
    overflow: hidden;
  }
}
.flex-1 {
  flex: 1;
}
.bgc img {
  position: absolute;
  width: 100%;
  height: 100%;
}
.h-bgc {
  width: 100%;
  height: 100%;
  position: relative;
}
.absolute {
  position: absolute;
}
.center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.span {
  text-align: center;
  font-size: 25px;
  color: var(--c-text);
  animation: hue-rotate 6s linear infinite;
}
.span img {
  position: static;
  width: 1.3rem;
  height: 1.3rem;
  vertical-align: middle;
}
.span p {
  color: var(--color) !important;
}
</style>
