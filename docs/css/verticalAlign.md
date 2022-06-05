---
title: 垂直居中方案
---

## flex margin

```html
<div class="container">
  <div class="box"></div>
</div>
```

```css
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
}
.box {
  width: 10px;
  height: 10px;
  margin: auto;
}
```
