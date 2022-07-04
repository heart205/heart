/**
 * @author heart
 * @description 客户端配置文件
 * @Date 2022-05-31
 */

import { defineClientConfig } from '@vuepress/client'
import Layout from './theme/layout.vue'
import RightSideBar from './plugin/rightSideBar/rightSideBar'
export default defineClientConfig({
  // https://vuepress.github.io/zh/advanced/cookbook/usage-of-client-config.html
  // enhance 使用方法:
  enhance({ app, router, siteData }) {
    // app.component 全局注册组件
    app.component('CustomLayout', Layout)
  },
  setup() {},
  rootComponents: [RightSideBar],
})
