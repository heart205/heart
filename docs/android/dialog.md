---
title: 'dialog'
---

```xml
    <Button
        android:layout_width="140dp"
        android:layout_height="53dp"
        android:onClick="openDialog"
        android:text="打开dialog" />

```

```java

    public void openDialog(View v) {
        dialogManager(this);
    }


  // dialog 弹窗
    public void dialogManager(Context context) {
        AlertDialog.Builder alertDialog = new AlertDialog.Builder(context);

        // setView可以自定义布局
        // root: 需要获取的根元素的布局
        // View inflate (int resource, ViewGroup root, boolean attachToRoot)
        //其中，第1个参数resource表示要加载的XML布局文件；第2个参数root表示再套上一个父容器root，如果不需要就传null；第3个参数attachToRoot表示是否将当前加载的布局套上一个父容器。
        //注意：如果使用第1种只含2个参数的方法传入了一个root就表示给布局再套上一个父容器root，attachToRoot默认为true。
        View view = getLayoutInflater().inflate(R.layout.dialog_layout, findViewById(R.id.textView));

        alertDialog.setIcon(R.mipmap.ic_launcher)
                .setTitle("标题")
                .setMessage("内容")
                .setPositiveButton("确认", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        Log.e(L, "确认");
                    }
                })
                .setNegativeButton("返回", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        Log.e(L, "返回");
                    }
                })
                .setNeutralButton("左边按钮", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        Log.e(L, "左边按钮");
                    }
                })
                .setView(view)
                .create()
                .show();
    }

```
