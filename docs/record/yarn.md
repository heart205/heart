---
title: yarn 指令
---

```
$ yarn -v		# 查看yarn版本

$ yarn config list		# 查看yarn配置

$ yarn config set registry https://registry.npm.taobao.org/ #修改yarn的源镜像为淘宝源

# 修改全局安装目录, 先创建好目录(global), 我放在了Yarn安装目录下(D:\RTE\Yarn\global)
$ yarn config set global-folder "D:\RTE\Yarn\global"		# 具体目录请改成自己的


# 修改全局安装目录的bin目录位置, bin目录需要自己创建, 而且需要把此目录加到系统环境变量(D:\RTE\Yarn\global\bin)
$ yarn config set prefix "D:\RTE\Yarn\global\"		# 会自动设置成*\global\bin


$ yarn config set cache-folder "D:\RTE\Yarn\cache"			# 修改全局缓存目录

$ yarn config list # 查看所有配置

$ yarn global bin # 查看当前yarn的bin的位置

$ yarn global dir # 查看当前yarn的全局安装位置

```