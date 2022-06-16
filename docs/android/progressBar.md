---
title: 'progress'
---


## 环形进度条
```xml
        <ProgressBar
            android:id="@+id/progress"
            android:layout_width="110dp"
            android:layout_height="76dp" />


         <Button
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:onClick="toggleClickProgress"
            android:text="toggle progress" />

```


在 `MainActivity` 中获取环状 `progress`
```java
public class MainActivity extends AppCompatActivity {
      private ProgressBar progress;


  @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        progress = findViewById(R.id.progress);
    }
}

```


`button` 监听的事件

> `View.GONE` 表示正在运行 `View.VISIBLE` 表示隐藏

```java
   public void toggleClickProgress(View v) {
        Log.e(TAG, "toggle click progress");
        if (progress.getVisibility() == View.GONE) {
            progress.setVisibility(View.VISIBLE);
        } else {
            progress.setVisibility(View.GONE);
        }
    }
```

## 水平进度条

```xml
        <!--        style="?android:attr/progressBarStyleHorizontal"水平进度条-->
        <!--        android:progress: 进度条已经完成的值-->
        <!--        indeterminate: 水平加载进度条-->
        <ProgressBar
            android:id="@+id/progress_horizontals"
            style="?android:attr/progressBarStyleHorizontal"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:indeterminate="true"
            android:max="100" />

        <Button
            android:id="@+id/changeProgress"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:onClick="changeProgress"
            android:text="模拟下载进度条" />

```


```java
    public void changeProgress(View v) {
        Log.e(TAG, "change click add Progress");
        ProgressBar progressBar = findViewById(R.id.progress_horizontals);
        int progress = progressBar.getProgress();
        Log.e(TAG, "progress :" + progress);
        progress += 10;
        progressBar.setProgress(progress);
    }
```