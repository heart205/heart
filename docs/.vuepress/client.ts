/**
 * @author heart
 * @description 客户端配置文件
 * @Date 2022-05-31
 */

import { defineClientConfig } from '@vuepress/client'
import Layout from './theme/layout.vue'
import RightSideBar from './plugin/rightSIdeBar'
export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('CustomLayout', Layout)
  },
  setup() {},
  rootComponents: [RightSideBar],
})
