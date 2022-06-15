---
title: 'Drawable'
---

## stateListDrawable
> stateListDrawable 是 Drawable 资源的一种 可以根据不同的状态 设置不同的图片效果 关键节点为`<selector>`

例如 可以 设置 不同的 item 对应的状态 使得 button 可以在不同的状态下加载不同的图片
1. state_focused:是否获得焦点
2. state_pressed:控件是否被按下
3. state_enabled:控件是否可用
4. state_selected:控件是否被选挥 针对有滚轮的情况
5. state_checked:控件是否被勾选
6. tate_checkable控件可否被勾选，cg:checkbox
7. state_window_focused: 是否获得窗口焦点
8. state_active:控件是否处于活动状态，eg:slidingTab
9. state_single:控件包含多个子控件时确定是否只显示一个子控件
10. state_first:拉件包含多个子拉件时确定第一个子控件是否处于显示状态
11. state_middle:控件包含多个子控件时确定中间一个子控件是否处于显示状态
12. state_last: 控件包含多个子控件时确定最后一个子控件是否处于显示状态

```xml
<selector>
    <item android:state_focused="true" android:drawable="@drawable/ic_launcher_background" />
    <item android:state_focused="false" android:drawable="@drawable/ic_launcher_background" />
</selector>
```
