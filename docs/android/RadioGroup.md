---
title: 'RadioGroup'
---

一般与`Radio` 控件一起使用 设置`RadioGroup`的 check则可以设置选中状态

```java
    // 监听radio的点击事件 使得radioGroup可以选中
    public void addRadioClickListener(RadioButton radioButton) {

        radioButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                RadioGroup radioGroup = findViewById(R.id.radio_group);
                radioGroup.check(v.getId());
            }
        });
    }
```