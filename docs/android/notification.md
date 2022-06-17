---
title: 'notification'
---

## notification 组件

封装一层`notification`组件:

```java
package com.example.myapplication;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.os.Build;
import android.util.TypedValue;

import androidx.core.app.NotificationCompat;

// setContentTitle setContent setSmallIcon 必填
public class notificationClass {


    private final Context context;

    private NotificationCompat.Builder builder;


    notificationClass(Context context, NotificationManager manager) {
        // context 上下文对象
        this.context = context;
        this.initNotification(context, manager);
    }


    public void initNotification(Context context, NotificationManager manager, String id) {

        // 使用Builder构造器创建Notification对象 保证程序在所有的版本上都可以正常工作
        // Android8.0新增 通知渠道概念 如果没有设置 则通知无法在Android8.0的机器上显示
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            // Android version 大于等于 8.0 的时候
            // NotificationChannel 通知的重要程度
            // IMPORTANCE_NONE 关闭通知
            // IMPORTANCE_MIN 开启通知 不会弹出 但没有提示音 状态栏中无显示
            // IMPORTANCE_LOW 开启通知 不会弹出 不发出提示音 状态栏中显示
            // IMPORTANCE_DEFAULT 开启通知 不会弹出 发出提示音 在状态栏中显示
            // IMPORTANCE_HIGH 开启通知 会弹出 发出提示音 状态栏中显示
            NotificationChannel channel = new NotificationChannel(id, "通知测试", NotificationManager.IMPORTANCE_HIGH);

            // NotificationManage 创建当前的channel
            manager.createNotificationChannel(channel);
        }
        // Builder 两个参数 上下文的对象 以及channelId
        // Android8.0引入 通知渠道 其允许为要显示的每种通知类型创建用户可以自定义的渠道
        builder = new NotificationCompat.Builder(context, id);
    }

    public void initNotification(Context context, NotificationManager manager) {
        String id = "notification";
        initNotification(context, manager, id);
    }

    // 设置标题
    public notificationClass setContentTitle(String str) {
        builder.setContentTitle(str);
        return this;
    }

    // 设置文本内容
    public notificationClass setContentText(String str) {
        builder.setContentText(str);
        return this;
    }

    // 设置小图标
    public notificationClass setSmallIcon(int icon) {
        builder.setSmallIcon(icon);
        return this;
    }

    // 设置小图标颜色
    // android 5.0开始 要求通知栏图标只使用alpha图层进行绘制 不能使用RBG图层进行绘制
    // RGB图层 有眼色的图层
    public notificationClass setColor(int argb) {
        builder.setColor(argb);
        return this;
    }

    // 设置通知大图标
    // 是否根据屏幕比例缩放
    public notificationClass setLargeIcon(int icon) {
        return setLargeIcon(icon, false);
    }

    public notificationClass setLargeIcon(int icon, boolean isScale) {
        // 使用BitmapFactory的decodeResource方法加载图片
        // 会因为屏幕比例不同加载的图片的比例也不同 可以通过设置
        BitmapFactory.Options options = new BitmapFactory.Options();
        TypedValue value = new TypedValue();

        options.inScaled = isScale; //设为不缩放
        options.inTargetDensity = value.density;
        builder.setLargeIcon(BitmapFactory.decodeResource(context.getResources(), icon, options));
        return this;
    }

    // 设置点击通知后的跳转意图
    public <T> notificationClass setContentIntent(Class<T> className) {
        Intent intent = new Intent(context, className);
        PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent, 0);
        builder.setContentIntent(pendingIntent);
        return this;
    }

    public notificationClass setAutoCancel() {
        return setAutoCancel(true);
    }

    // 设置点击通知后自动清除通知
    public notificationClass setAutoCancel(boolean bool) {
        builder.setAutoCancel(bool);
        return this;
    }

    // 设置通知被创建的时间
    public notificationClass setWhen(long when) {
        builder.setWhen(when);
        return this;
    }

    public Notification build() {
        return builder.build();
    }
}

```

```java
    // 发送通知
    public void sendMessage(View v) {
        Notification notification = new notificationClass(this, notificationManager)
                .setContentTitle("通知标题")
                .setContentText("通知内容设置")
                .setSmallIcon(R.drawable.ic_baseline_5g_24)
                .setLargeIcon(R.drawable.avatar)
                .setColor(Color.parseColor("#ff0000"))
                .setContentIntent(DisplayMessageActivity.class)
                .setAutoCancel()
                .build();
                // 发送标志的id
        notificationManager.notify(1, notification);
    }

    // 取消通知
    public void cancelMessage(View v) {
      // 取消标志的id 需要对应发送标志的id
        notificationManager.cancel(1);
    }
```
