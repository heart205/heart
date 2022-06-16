---
title: 'ImageView'
---

属性:
scaleType: 缩放类型

1. fitStart 保持宽高比缩放图片，直到较长的边与 Image 的边长相等,缩放完成后将图片放在 ImageView 的左上角

2. fitCenter 默认值，同上，缩放后放于中间

3. fitEnd 同上，缩放后放于右下角

4. fitXY 对图像的横纵方向进行独立缩放，使得该图片完全适应 ImageView,但是图片的宽高比可能会发生改变

5. center 保持原图的大小，显示在 ImageView 的中心。当原图的 size 大于 ImageView 的 size,超过部分裁剪处理。

6. centerCrop 保持宽高比缩放图片，直到完全覆盖 ImageView,可能会出现图片的显示不完全

7. centerInside 保持宽高比缩放图片，直到 ImageView 能够完全地显示图片

8. matrix 不改变原图的大小，从 ImageView 的左上角开始绘制原图，原图超过 ImageView 的部分作裁剪处理

9. maxHeight、 maxWidth

```xml
        <!--        scaleType: 缩放类型-->
        <!--        fit 保持宽高比缩放图片-->
        <!--        fixXY 类似于cover 会缩放图片-->
        <!--        centerInside 图片 大于尺寸 与 fitCenter效果一样 如果小于 则直接展示-->
        <!--        fitCenter contain-->
        <!--        matrix从左上角开始绘图-->
        <!--        maxWidth、maxHeight-->
        <!--        adjustViewBounds 可以调整View边界-->
        <ImageView
            android:layout_width="wrap_content"
            android:layout_height="200dp"
            android:adjustViewBounds="true"
            android:scaleType="fitCenter"
            android:src="@drawable/avatar" />
```
