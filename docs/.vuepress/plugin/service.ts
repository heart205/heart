const { path } = require('@vuepress/utils')
import { defaultTheme } from 'vuepress'
export const serviceTheme = (options) => {
  console.log(options)
  return {
    name: 'website-theme-heart',
    extends: defaultTheme({
      navbar: [
        {
          text: 'javaScript',
          link: '/javascript.html',
        },
      ],
      // logo: '/favicon.ico',      // logo
      // logoDark: '/favicon.ico',  //夜间模式的logo
      darkMode: true, //更换夜间颜色
      // repo: ''                   // 一个仓库链接
      // repoLabel:''               // 仓库名字
      sidebar: 'auto',
      sidebarDepth: 3,
      editLink: true,
      editLinkText: '在 GitHub 上编辑此页',
      // docsBranch:'',             // 文档分支
      // docsDir: '',               // 文档目录
      // docsRepo: '',              // 文档仓库
      // editLinkPattern: '',       // 编辑链接模式
      lastUpdated: true, // 是否显示最后更新时间
      lastUpdatedText: '上次更新', // 最后更新时间文本
      contributors: true, // 是否显示贡献者
      tip: '提示',
      warning: '警告',
      danger: '危险',
      notFound: ['404.md', '404.vue'], // 进入404后 会随机选取一条信息展示
      backToHome: '返回首页',
    }),
  }
}
