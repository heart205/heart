---
title: "LinearLayout布局"
---
```xml
<?xml version="1.0" encoding="utf-8"?>

<!-- orientation布局中组件的排列方式-->
<!-- gravity 控制组件所包含的子元素的对其方式 可以多个组合-->

<!-- divider分割线-->
<!-- showDividers 设置分割线所在的位置 none:无 beginning:开始 end:结束 middle: 每两个组件之间-->
<!-- dividerPadding 设置的分割线 padding-->
<!-- layout_weight: 权重 该属性是用来等比例的划分剩余的区域 注意:剩余的区域-->
<!-- 如果下面三个都是match_parent 但是只有一个屏幕 需要的空间为3个屏幕-->
<!-- 因此剩余的需要屏幕的高度为 -2 -->
<!-- 设置屏幕的高度为 y-->
<!-- 则第一个屏幕 的高度y - (1 - 3) * 2y / 4 =  0-->
<!-- 因此第一个元素的高度会为0-->
<!-- 其余的两个的高度 计算为y - (1 - 3) * y / 4 = 1 / 2-->
<!-- 因此推荐使用0dp 去布局-->
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:divider="@drawable/ic_baseline_arrow_back_24"
    android:dividerPadding="10dp"
    android:gravity="center_horizontal|center_vertical"
    android:orientation="vertical"
    android:showDividers="middle">


    <!-- layout_gravity 控制该组件在父容器中的对其方式-->
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_gravity="center_vertical"
        android:layout_weight="2"
        android:background="#ff00ff" />

    <!--background 设置背景颜色-->
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_weight="1"
        android:background="#ff2200" />


    <!--用view设置分割心啊-->
    <View
        android:layout_width="match_parent"
        android:layout_height="1dp"
        android:background="@color/purple_200" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_weight="1"
        android:background="#eeffdd" />
</LinearLayout>


```