---
title:全局CSS修改
---

## 创建palete.styl文件

palete.styl 负责全局颜色设置。在编译期间，主题颜色常量应该首先由预处理器解析，然后应用于全局上下文。


> 在 `.vuepress/styles`下创建 `palete.styl` 文件

```css
/* 修改全局的页面布局 */
.theme-container {
  margin-right 150px
}
```

## 参考资料

[palette.style 解释](https://www.vuepress.cn/faq/#%E4%B8%BA%E4%BB%80%E4%B9%88%E4%B8%8D%E8%83%BD%E6%8A%8A-palette-styl-%E5%92%8C-index-styl-%E5%90%88%E5%B9%B6%E5%88%B0%E4%B8%80%E4%B8%AA-api)