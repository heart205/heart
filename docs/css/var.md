---
title: css变量
---

## currentColor

currentColor 顾名思意就是“当前颜色”，准确讲应该是“当前的文字颜色”

> color的改变会带动边框一起改变
```css
.changeColor {
  color: var(--btn-color);
  border-color: currentColor;
}
```

## var(--variable) 的使用

## 参考文章

- [currentColor](https://www.zhangxinxu.com/wordpress/2014/10/currentcolor-css3-powerful-css-keyword/)
