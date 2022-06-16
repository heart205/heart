---
title: 'Button'
---

button如果需要设置背景颜色 则需要修改主题文件中的`Theme.MaterialComponents.DayNight.DarkActionBar` 改为 `Theme.MaterialComponents.DayNight.DarkActionBar.Bridge`
```xml
        <!--        android:29 之后  需要 修改 color 的一个属性 将主题的Theme.MaterialComponents.DayNight.DarkActionBar 修改为Theme.MaterialComponents.DayNight.DarkActionBar.Bridge-->
        <!--        android:backgroundTint，那么就会将设置的颜色和原来的背景进行一个叠加的过程-->

        <!--        事件绑定可以在xml中指定-->
        <Button
            android:layout_width="147dp"
            android:layout_height="73dp"
            android:background="#ff00ff00"
            android:backgroundTint="#ff12"
            android:onClick="xmlClick"
            android:text="@string/primary_btn" />
```

```java
    public void xmlClick(View v) {
        Log.e(TAG, "click test");
        System.out.println(v);
    }
```


`background` 还可以在 `drawable`目录下指定一个xml文件自定义`background` 实现点击颜色变化

```xml
 <Button
            android:id="@+id/btn"
            android:layout_width="147dp"
            android:layout_height="73dp"
            android:background="@drawable/btn_selector"
            android:text="@string/primary_btn" />
```

`btn_selector.xml` 中

> state_pressed 点击按下的状态触发为

```xml
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@drawable/ic_baseline_5g_24" android:state_pressed="true" />
    <item android:drawable="@drawable/ic_baseline_brightness_1_24" />
</selector>
```


## 事件监听点击事件

>  事件冒泡顺序  touch => longClick => click  `return true` 则不会冒泡



```java
        // 根据id寻找按钮
        Button btn = findViewById(R.id.btn);
```

```java
       // 点击事件
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Log.e(TAG, "on click event");
                // 绑定的控件
                System.out.println(view);
            }
        });
```


```java
        // 长按事件
        btn.setOnLongClickListener(new View.OnLongClickListener() {
            @Override
            public boolean onLongClick(View v) {
                Log.e(TAG, "on long click");
                // 返回 true 事件不会冒泡
                return false;
            }
        });

```


```java
        // 触摸事件
        btn.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                Log.e(TAG, "on touch");
                // return false 则事件不会冒泡
                return false;
            }
        });

```