---
title: 'popupWindow'
---

```xml
    <Button
        android:id="@+id/closePopupWindow"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:onClick="handlePopupWindow"
        android:text="打开popupWindow"/>
```

```java

   // popupWindow
    public void handlePopupWindow(View v) {
        // 获取布局的组件
        View popup = getLayoutInflater().inflate(R.layout.popop_view, null);

        // new PopupWindow(View contentView, int width, int height)
        // 也可以通过new PopupWindow(int width,int height)
        // 再通过setContentView设置要显示的view
        PopupWindow p = new PopupWindow(popup, ViewGroup.LayoutParams.WRAP_CONTENT, ViewGroup.LayoutParams.WRAP_CONTENT);


        // TODO: 暂且不明白什么意思
        System.out.println("WRAP_CONTENT" + ViewGroup.LayoutParams.WRAP_CONTENT);
        System.out.println("MATCH_PARENT" + ViewGroup.LayoutParams.MATCH_PARENT);
        System.out.println("view" + ViewGroup.LayoutParams.class);


        // 设置是否获取焦点 失去焦点的时候能够隐藏popup
        p.setFocusable(true);

        Button btn = popup.findViewById(R.id.closePopupWindow);
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // 关闭popup窗口
                p.dismiss();
            }
        });


        // 设置PopupWindow显示的View
        // 相对某个控制的位置（正左下方） 无偏移
        // p.showAsDropDown(v);
        // showAsDropDown(View anchor, int xoff, int yoff)  有偏移
        p.showAsDropDown(v, 100, 100);


        // setBackgroundDrawable(Drawable background) 设置背景颜色
        // setTouchable(boolean touchable) 设置触摸使能
        // setOutsideTouchable(boolean touchable) 设置PopupWindow外面的触摸使能

    }
```
