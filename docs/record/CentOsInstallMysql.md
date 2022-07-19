---
title: CentOS 安装mysql
---

1. 下载并安装MySQL官方的 Yum Repository

```shell
 wget -i -c http://dev.mysql.com/get/mysql57-community-release-el7-10.noarch.rpm
```

```shell
yum -y install mysql57-community-release-el7-10.noarch.rpm
```
安装mysql服务器

```shell
yum -y install mysql-community-server
```


2. 启动mysql

```shell
 systemctl start  mysqld.service
```

查看mysql的运行状态

```shell
 systemctl status mysqld.service
```

MySQL已经开始正常运行，不过要想进入MySQL还得先找出此时root用户的密码，通过如下命令可以在日志文件中找出密码：

```shell
 grep "password" /var/log/mysqld.log
```

之后进入数据库
```shell
 mysql -uroot -p
```

之后修改密码
> 密码设置必须要大小写字母数字和特殊符号（,/’;:等）,不然不能配置成功
```shell
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'new password';
```

开启mysql的远程访问
执行以下命令开启远程访问限制（注意：下面命令开启的IP是 192.168.0.1，如要开启所有的，用%代替IP）
```shell
grant all privileges on *.* to 'root'@'192.168.0.1' identified by 'password' with grant option;
```

```shell
mysql> flush privileges;
mysql> exit
```

为firewalld添加开放端口


```shell
[root@localhost ~]# firewall-cmd --zone=public --add-port=3306/tcp --permanent
```

重写载入
```shell
[root@localhost ~]# firewall-cmd --reload
```

## 更改sql语言

重新登录mysql，然后输入status
可以看到server 和db的 `characterset` 不是`utf8` 需要设置


```shell
vi /ect/my.cnf
```
添加以下四行
```shell{1,2,24,25}
[client]
default-character-set=utf8
# For advice on how to change settings please see
# http://dev.mysql.com/doc/refman/5.7/en/server-configuration-defaults.html

[mysqld]
#
# Remove leading # and set to the amount of RAM for the most important data
# cache in MySQL. Start at 70% of total RAM for dedicated server, else 10%.
# innodb_buffer_pool_size = 128M
#
# Remove leading # to turn on a very important data integrity option: logging
# changes to the binary log between backups.
# log_bin
#
# Remove leading # to set options mainly useful for reporting servers.
# The server defaults are faster for transactions and fast SELECTs.
# Adjust sizes as needed, experiment to find the optimal values.
# join_buffer_size = 128M
# sort_buffer_size = 2M
# read_rnd_buffer_size = 2M
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock
character-set-server=utf8
collation-server=utf8_general_ci

# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0

log-error=/var/log/mysqld.log
pid-file=/var/run/mysqld/mysqld.pid
```

## 参考资料

- [CentOS7安装MySQL（完整版）](https://blog.csdn.net/pythonyzh2019/article/details/118219738)