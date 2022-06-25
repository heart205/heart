---
title: ReactiveLayout
---

## 相对布局

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <!--    相对定位布局-->
    <!--    根据父容器定位-->
    <!--    layout_alignParentStart左对齐-->
    <!--    layout_alignParentBottom底部对其-->
    <!--    layout_alignParentEnd 水平从左往右对齐-->
    <!--    layout_centerVertical 垂直居中-->
    <!--    layout_centerHorizontal 水平居中-->
    <!--    layout_centerParent 距离父元素的中间位置-->
    <RelativeLayout
        android:id="@+id/relative"
        android:layout_width="200dp"
        android:layout_height="200dp"
        android:layout_alignParentEnd="true"
        android:layout_alignParentBottom="true"
        android:background="@color/purple_200" />


    <!--        根据兄弟组件定位-->
    <!--        layout_toLeftOf 放置于参考组件的左边-->
    <!--        layout_toRightOf 放置于参考组件的右边-->
    <!--        layout_above 放置于参考组件的上方-->
    <!--        layout_below 放置于参考组件的下方-->
    <!--        layout_alignTop 对齐参考组件的上边界-->
    <!--        layout_alignLeft 对其参考组件的右边界-->
    <RelativeLayout
        android:layout_width="100dp"
        android:layout_height="100dp"
        android:layout_alignLeft="@id/relative"
        android:layout_alignTop="@+id/relative"
        android:background="@mipmap/ic_launcher">
    </RelativeLayout>
</RelativeLayout>

```