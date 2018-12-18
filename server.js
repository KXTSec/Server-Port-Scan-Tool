const express = require("express");
const scan = require("./lib/scan");

// 创建服务器，默认8080端口监听
const server = express();
server.listen(8080);
console.log("已成功运行服务器，监听端口:8080");

// 接收前台Ajax请求，扫描服务器端口并返回数据
server.use("/user",function (req, res) { 
    obj = req.query;
    let arr = Array();
    // 引用本地scan.js模块扫描服务器端口
    scan(obj.address, obj.Sport,obj.Eport, function(result) { 
        for (var i = 0; i < result.length; i++) {
            arr[i] = result[i];
        }
        console.log("服务器:"+obj.address+" 端口扫描成功，开放端口数为"+arr.length+"个");
        res.send(arr);
    });  
});
// 处理前台静态页面请求
server.use(express.static("./",{index:"index.html"}));
// 宁夏凯信特实验室——许超