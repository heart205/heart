---
title: 'toolBar'
---

需要提前在`theme` 中取消原有的`parent`的tabBar 设置为 `android:theme="@style/Theme.AppCompat.DayNight.NoActionBar"`


使用:

```xml
    <androidx.appcompat.widget.Toolbar
        android:id="@+id/toolbarId"
        android:layout_width="match_parent"
        android:layout_height="?android:attr/actionBarSize"
        android:accessibilityPaneTitle="@string/marquee"
        android:background="#ff0023a1"
        android:gravity="center"
        app:logo="@drawable/ic_launcher_background"
        app:navigationIcon="@drawable/ic_baseline_arrow_back_24"
        app:subtitle="副标题"
        app:subtitleTextColor="@color/purple_200"
        app:title="@string/activity_name"
        app:titleMarginStart="40dp"
        app:titleTextColor="@color/purple_200" />
```

给 toolBar 的 navigationIcon 添加点击事件
<!--   android:layout_gravity="center" 能让wrap_content 水平居中 类似html中的margin:0 auto -->
```xml
  <androidx.appcompat.widget.Toolbar
        android:id="@+id/toolbarSecondId"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginTop="20dp"
        android:layout_marginBottom="20dp"
        android:background="@color/white"
        app:navigationIcon="@drawable/ic_baseline_arrow_back_24">
        <!--        layout_gravity居中对其-->
        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center"
            android:text="标题居中"
            android:textColor="@color/black" />
    </androidx.appcompat.widget.Toolbar>

```

`MainActivity.java`中

```java

        Toolbar bar = findViewById(R.id.toolbarSecondId);

        bar.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                bar.setTitle("标题被改变了");
            }
        });

```
