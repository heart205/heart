/**
 * @author heart
 * @description 右边侧边栏插件以及高亮
 * @Date 2022-07-02
 */
import './rightSideBar.css'
import { usePageData } from '@vuepress/client'
import { useRoute, useRouter } from 'vue-router'
import { debounce } from '../../utils/index'
import { defineComponent, watch, ref, onMounted, onBeforeUnmount } from 'vue'

interface PageHeader {
  level: number
  title: string
  slug: string
  children: PageHeader[]
}

export default defineComponent({
  name: 'right-side-bar',
  setup() {
    /** 判断当前的页面是否是首页 如果不是首页的话获取侧边栏 */
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
    let isHash = false
    const setOutLineOffset = (i: number) => {
      scrollTop.value = (i + 1) * 20
    }
    const getPageTitleTop = (title: PageHeader[]) => {
      if (title instanceof Array) {
        title.forEach((val) => {
          const t = document.getElementById(val.slug)
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
        /** 改变路由参数 */
        pageHeight.length = 0
        title.value = pageData.value.frontmatter.title || defaultTitle
        isShow.value = val !== '/'
        /** 获取页面上所有的h节点 */
        headers.value = pageData.value.headers
        setOutLineOffset(
          headers.value.length > 0 && headers.value[0].level !== 1 ? 0 : -1
        )
        setTimeout(() => {
          /** 获取dom节点 */
          getPageTitleTop(headers.value)
        }, 500)
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
          isHash = true
          setOutLineOffset(index)
        }
      },
      {
        immediate: true,
      }
    )

    const scrollEl = debounce(() => {
      if (isHash || pageHeight.length === 0) {
        isHash = false
        return
      }

      const heightTop = window.scrollY + 55

      if (heightTop < pageHeight[0]) {
        setOutLineOffset(0)
        return
      }

      for (let i = 0; i < pageHeight.length; i++) {
        if (heightTop <= pageHeight[i]) {
          setOutLineOffset(i - 1)
        }
      }

      if (heightTop > pageHeight[pageHeight.length - 1]) {
        setOutLineOffset(pageHeight.length - 1)
      }
    }, 0)

    onMounted(() => {
      window.addEventListener('scroll', scrollEl, false)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', scrollEl, false)
    })

    const handleToLink = (value: PageHeader) => {
      router.push(`#${value.slug}`)
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
        <div class="fixed right-side bl-1">
          <div
            ref={'outLineRef'}
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
