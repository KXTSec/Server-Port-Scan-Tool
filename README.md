---
Tool Name : Server Port Scan Tool
Version   : v 0.1.0
Developer : Xu Chao
E-mail    : nx_kxt@163.com
Date      : 18/12/24
---

# 服务器端口扫描工具

服务端基于Node.js开发，可扫描公网/内网服务器开放端口，外网处理速度2分钟，内网处理速度20秒。

### 功能特点

- 非阻塞I/O操作，高并发处理
- 支持公网/内网端口扫描
- 可选择多种扫描模式
- 自动解析域名
- 搭建过程简单

### 服务器搭建教程


  1. 将端口扫描工具下载至本地，解压缩
  2. 下载 [node.js](http://nodejs.cn/download/) 环境
  3. 安装服务器依赖，执行`npm install express`
  4. 终端切换至工具所在文件夹，执行`node server.js`
  5. 浏览器访问 http://localhost:8080

### 源码结构

```
├─lib               # 引用文件
│  ├─bootstrap        # bootstrap环境
│  ├─index.js         # 前台数据处理，Ajax数据交互脚本
│  ├─index.css        # 前端样式脚本
│  ├─jquery-3.3.1.min.js # jquery脚本文件
│  └─scan.js          # 端口扫描模块
├─node_modules      # nodejs模块
│  └─express          # express框架
├─src               # 素材文引用文件夹
│  ├─tittle.png       # index页面Logo
│  └─tool.zip         # 内网扫描工具（包含全环境）
├─favicon.ico       # 浏览器标签图标
├─index.html        # 前台页面（8080端口默认起始页）
├─README.md         # 说明文档
├─server.js         # 服务器模块
└─package-lock.json # nodejs包依赖配置文件

```

### 联系我

------

<img src="src/WeChat.jpg" tittle="宁夏凯信特" style="width:200px" />