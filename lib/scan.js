module.exports = function scan(host, start, end, callback) { 
    var net = require('net'); 
    var count = end - start; 
    var result = []; 
    console.time('端口扫描时间');    // 程序开始锚点
    // ping服务器端口，并将通端口添加至数组result
    for (var i = start; i <= end; i++) { 
        var item = net.connect({ 
            host: host, 
            port: i 
        }, 
        function(i) { 
            return function() { 
                result.push(i); 
                this.destroy(); 
            }; 
        }(i) ); 
        // 异常信息处理
        item.on('error', function(err) { 
            if (err.errno == 'ECONNREFUSED') { 
                this.destroy();
            } 
        }); 
        // 回调函数，返回数组
        item.on('close', function() { 
            if (!count--) {
                 console.timeEnd('端口扫描时间');  // 程序结束锚点，打印运行时间
                 callback(result); 
                } 
            }); 
        }
    }