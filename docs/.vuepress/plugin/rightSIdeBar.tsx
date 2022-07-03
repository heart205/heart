/**
 * @author heart
 * @description 右边侧边栏插件以及高亮
 * @Date 2022-07-02
 */

import {
  defineComponent,
  watch,
  ref,
  onMounted,
  onBeforeUnmount,
  nextTick,
} from 'vue'

import { usePageData } from '@vuepress/client'

import { useRoute, useRouter } from 'vue-router'

import './rightSideBar.css'

interface PageHeader {
  level: number
  title: string
  slug: string
  children: PageHeader[]
}

export default defineComponent({
  name: 'test-demo',
  setup() {
    /**
     * 判断当前的页面是否是首页 如果不是首页的话获取侧边栏
     */
    const defaultTitle = 'heart'
    const pageData = usePageData()
    const headers = ref<PageHeader[]>([])
    const title = ref(defaultTitle)
    const route = useRoute()
    const router = useRouter()
    const outLineRef = ref<HTMLDivElement>()
    const pageHeight: number[] = []
    const scrollTop = ref<number>(0)

    const isShow = ref<boolean>(false)

    const setOutLineOffset = (i: number) => {
      scrollTop.value = (i + 1) * 20
    }

    const getPageTitleTop = (title: PageHeader[]) => {
      if (title instanceof Array) {
        title.forEach((val) => {
          const id = isNaN(Number(val.title)) ? val.title : `_${val.title}`
          const t = document.getElementById(id)
          if (t) {
            pageHeight.push(t.offsetTop)
          }
          if (val.children.length > 0) {
            getPageTitleTop(val.children)
          }
        })
      }
    }

    watch(
      () => route.path,
      (val) => {
        // 改变路由参数
        setTimeout(() => {
          nextTick(() => {
            pageHeight.length = 0
            getPageTitleTop(headers.value)
          })
        }, 500)
        title.value = pageData.value.frontmatter.title || defaultTitle
        headers.value = pageData.value.headers
        // 获取页面上所有的h节点
        isShow.value = val !== '/'
        setOutLineOffset(
          headers.value.length > 0 && headers.value[0].level !== 1 ? 0 : -1
        )
      },
      {
        immediate: true,
      }
    )

    watch(
      () => route.hash,
      (val) => {
        const index = headers.value.findIndex((t) => {
          if (isNaN(Number(t.title))) {
            return `#${t.slug}` === val
          }
          return `#_${t.slug}` === val
        })
        if (index > -1) {
          setTimeout(() => {
            setOutLineOffset(index)
          }, 0)
        }
      },
      {
        immediate: true,
      }
    )

    const scrollEl = () => {
      if (pageHeight.length === 0) return
      const heightTop = window.scrollY + 55
      if (heightTop < pageHeight[0]) {
        setOutLineOffset(0)
        return
      }
      // i - length - 1
      for (let i = 1; i < pageHeight.length - 1; i++) {
        if (heightTop > pageHeight[i - 1] && heightTop < pageHeight[i + 1]) {
          setOutLineOffset(i)
          return
        }
      }

      if (heightTop > pageHeight[pageHeight.length - 1]) {
        setOutLineOffset(pageHeight.length - 1)
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', scrollEl, false)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', scrollEl, false)
    })

    const handleToLink = (value) => {
      router.push(`#${value.title}`)
    }

    const loop = (value: PageHeader) => {
      // 根据值去递归
      return (
        <div class="m-3 right-side-body" onClick={() => handleToLink(value)}>
          {value.title}
          {value.children.length > 0
            ? value.children.map((child) => loop(child))
            : ''}
        </div>
      )
    }

    return () => {
      return isShow.value ? (
        <div class="fixed right-side bl-1 ">
          <div
            ref={outLineRef}
            class="outline"
            style={`transform:translateY(${scrollTop.value}px)`}
          ></div>
          <div class="right-side-title m-3">{title.value}</div>
          <div class="right-side-content">
            {headers.value.map((val) => {
              return loop(val)
            })}
          </div>
        </div>
      ) : (
        <div></div>
      )
    }
  },
})
