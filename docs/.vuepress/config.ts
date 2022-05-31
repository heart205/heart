/**
 * @author heart
 * @description 服务端配置文件
 * @Date 2022-05-31
 */
import { defineUserConfig } from 'vuepress'
import { setupDefine } from './plugin/readEnv'
import { serviceTheme } from './plugin/service'
export default defineUserConfig({
  lang: 'zh-CN',
  title: 'heart website',
  description: 'heart website',
  plugins: [serviceTheme],
  define: setupDefine(),
})
