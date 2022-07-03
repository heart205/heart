
 declare module '*.vue' {
  import { defineComponent } from 'vue'
  const Component: ReturnType<typeof defineComponent>
  export default Component
}

declare interface Window {
  __VUEPRESS_ENV: {
    TITLE: string
  }
}
