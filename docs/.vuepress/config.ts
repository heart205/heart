/**
 * @author heart
 * @description 服务端配置文件
 * @Date 2022-05-31
 */
import { defineUserConfig } from 'vuepress'
import { setupDefine } from './plugin/useSetupDefine'
import { serviceTheme } from './plugin/service'
const { path } = require('@vuepress/utils')
import ViteJsx from '@vitejs/plugin-vue-jsx'
import { viteBundler } from '@vuepress/bundler-vite'
const {
  registerComponentsPlugin,
} = require('@vuepress/plugin-register-components')

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'heart website',
  description: 'heart website',
  define: setupDefine(),
  plugins: [
    serviceTheme,
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
  ],
  bundler: viteBundler({
    viteOptions: {
      plugins: [ViteJsx()],
    },
    vuePluginOptions: {},
  }),
})
