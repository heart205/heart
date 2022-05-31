const { path } = require('@vuepress/utils')

export const clientThemeConfig = (options) => {
  return {
    name: 'client-heart-theme',
    layouts: {
      Layout: path.resolve(__dirname, './layout.vue'),
      404: path.resolve(__dirname, './404.vue'),
    },
  }
}
