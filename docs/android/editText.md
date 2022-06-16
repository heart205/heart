---
title: 'editText'
---



类似于input输入框

## 属性

1. hint: 输入提示
2. textColorHint 输入提示文字的颜色
3. inputType 输入类型
4. drawableLeft drawableRight ... 输入框指定方位添加图片
5. drawablePadding 设置图片与输入内容的边距
6. background 设置背景


```xml
        <EditText
            android:id="@+id/editTextTextPersonName2"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:autofillHints="string"
            android:ems="10"
            android:inputType="textPersonName"
            android:minHeight="48dp"
            android:text="@string/name" />
```


```xml
      <EditText
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:drawableLeft="@drawable/ic_baseline_verified_user_24"
            android:drawablePadding="50dp"
            android:hint="请输入内容"
            android:inputType="phone"
            android:paddingLeft="20dp"
            android:textColorHint="@color/purple_200" />
```