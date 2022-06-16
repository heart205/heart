---
title: 'textView'
---

```xml
        <!--    match-parent  父元素的宽度或者高度-->
        <!--    warp-content  去值是当前填充的字符串的宽度-->
        <!--    layout_width layout_height 单位都是dp-->
        <!--    textColor FF000000 FF 表示alpha-->
        <!--    textSize: 单位 sp-->
        <!--    textStyle 字体风格-->
        <!--    gravity 布局方式-->
        <!--    background 背景颜色-->
        <!--    @string/ 会映射到 values 的 strings中-->
        <TextView
            android:id="@+id/firstComponents"
            android:layout_width="163dp"
            android:layout_height="46dp"
            android:text="@string/app_name"
            android:textColor="#FF000000"
            android:textSize="20sp"
            android:textStyle="bold" />
```

文本等属性可以在 MainActivity.java 中通过`id` 获取元素 并且修改属性

```java
        TextView view = findViewById(R.id.firstComponents);
        // setting  textView text tag value
        view.setText("update name");
```

## shadow 属性

```xml
        <!--        shadow 配置：-->
        <!--        shadowRadius: 设置阴影的模糊成都 设为0.1相当于字体的颜色 推荐3.0-->
        <!--        shadowColor: 设置阴影颜色 需要与shadowRadius一起使用-->
        <!--        shadowDx: 阴影水平偏移量-->
        <!--        shadowDy: 阴影垂直偏移量-->
        <TextView
            android:layout_width="128dp"
            android:layout_height="wrap_content"
            android:shadowColor="#FF0011"
            android:shadowDx="3.0"
            android:shadowDy="3.0"
            android:shadowRadius="3.0"
            android:text="@string/shadow_demo"
            android:textColor="@color/black" />

```

## 自定义 TextView

```xml
        <!--        跑马灯效果的TextView-->
        <!--        singleLine: 内容单行显示-->
        <!--        focusable:是否可以获取焦点-->
        <!--        focusableInTouchMode:用于控制视图在触摸模式下是否可以聚焦-->
        <!--        ellipsize：在哪里省略文本-->
        <!--        marqueeRepeatLimit：循环次数-->
        <!--        TODO: 此时设置之后还不能跑动 因为没有聚焦 解决方法:-->
        <!--        设置clickable 使得点击就可以跑动-->
        <!--        自定义TextView 并且 重写isFocused-->
    <com.example.myapplication.MyTextView
            android:layout_width="200dp"
            android:layout_height="wrap_content"
            android:clickable="true"
            android:ellipsize="marquee"
            android:focusable="true"
            android:focusableInTouchMode="true"
            android:marqueeRepeatLimit="marquee_forever"
            android:minHeight="48dp"
            android:singleLine="true"
            android:text="@string/marquee"
            android:textColor="@color/black" />

```

自定义一个类去继承  `AppCompatTextView` 并且重写聚焦方法
```java
package com.example.myapplication;

import android.content.Context;
import android.util.AttributeSet;

import androidx.annotation.Nullable;
import androidx.appcompat.widget.AppCompatTextView;


class MyTextView extends AppCompatTextView {
    public MyTextView(Context context) {
        super(context);
    }

    public MyTextView(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
    }

    public MyTextView(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    /**
     * 获取焦点 滚动
     * @return
     */
    @Override
    public boolean isFocused() {
        return true;
    }
}

```

## 跑马灯效果的 textView

```xml
        <com.example.myapplication.MyTextView
            android:layout_width="200dp"
            android:layout_height="wrap_content"
            android:clickable="true"
            android:ellipsize="marquee"
            android:focusable="true"
            android:focusableInTouchMode="true"
            android:marqueeRepeatLimit="marquee_forever"
            android:minHeight="48dp"
            android:singleLine="true"
            android:text="@string/marquee"
            android:textColor="@color/black" />
        <!--        获取焦点的第二种方法-->
        <TextView
            android:layout_width="200dp"
            android:layout_height="wrap_content"
            android:clickable="true"
            android:ellipsize="marquee"
            android:focusable="true"
            android:focusableInTouchMode="true"
            android:marqueeRepeatLimit="marquee_forever"
            android:minHeight="48dp"
            android:singleLine="true"
            android:text="@string/marquee"
            android:textColor="@color/black">
            <!--获取焦点的属性-->
            <requestFocus />
        </TextView>
```
