$(document).ready(function(){
    var id = 1;
    // 导航栏菜单页面切换
    $('#bar > li').on('click',function(e){
        $("#res").empty();             // 清除上一次返回数据显示模块
        let $target = $(event.target); // 此处就是可以查看是哪个点击的jQ对象
        let $bar = $('#bar > li');
        $bar.removeClass();
        $target.parent().addClass("active");
        id = $target.attr("value");
        $(".con").hide();
        $("#con"+id).show(); 
    });
    // 数据提交按钮点击监听
    $('.con > #btn').click(function(){
        $("#con"+id+" > #btn").addClass("disabled");         // 禁用按钮，服务器返回数据后解锁
        $("#con"+id+" > #btn").val("正在扫描端口，请等待..."); // 修改按钮显示
        // 判断页面提交数据并赋值
        let $address = $("#con"+id+" > div > #address").val();
        let $Sport = $("#con"+id+" > div > #Sport").val();
        let $Eport = $("#con"+id+" > div > #Eport").val();
        // 判断域名类型
        reg_1 = RegExp(/http:\/\//);
        reg_2 = RegExp(/https:\/\//);
        if(reg_1.test($address)){
            $address = $address.slice(7);
        }else if(reg_2.test($address)){
            $address = $address.slice(8);
        }else{}
        // 判断扫描端口类型
        if ($address == ""){
            alert("请输入正确的端口\\域名！");
            $("#con"+id+" > #btn").removeClass("disabled");
            $("#con"+id+" > #btn").val("确定");
            return;
        }else{
            if($Eport == ""){
                if($Sport == "扫描1-65535端口"){    // 全端口扫描
                    Sport = 1;
                    Eport = 65535;
                }else{                             // 指定端口扫描
                    Sport = $Sport;
                    Eport = $Sport;
                }
            }else{                                 // 指定区间扫描
                Sport = $Sport;
                Eport = $Eport;
            }
        }
        
        console.log($address,Sport,Eport);       // 打印提交数据
        
        // Ajax提交数据到后台
        
        $.ajax({  
            url:"/user",
            data:{
                address:$address,
                Sport:Sport,
                Eport:Eport
            },
            success:function(str){
                $("#res").empty();      // 清除上一次返回数据显示模块
                openPort = eval(str);   // 将后台返回数据解析成数组
                console.log(openPort);  // 浏览器控制台打印开放端口数组

                // 将数据与表格结合动态添加到前台
                let res_head = "<table class=\"table table-hover table-bordered\" style=\"text-align: center\"><div class=\"row\" style=\"text-align: center;\"><div class=\"col-lg-4\">服务器："+ $address +"</div><div class=\"col-lg-4\">开放端口数："+ openPort.length + " 个</div><div class=\"col-lg-4\">扫描状态：<span class=\"label label-success\">已完成</span></div></div><thead><tr><th style=\"text-align: center\">端口号</th><th style=\"text-align: center\">开放状态</th></tr></thead> <tbody>";
                let res_body = new String();
                if (openPort.length == 0){
                    res_body = "<tr><td>无开放端口</td><td><span class=\"label label-default\">closed</span></td></tr>"
                }else{
                    for(let s=0; s<openPort.length; s++){
                        res_body = res_body + "<tr><td>" + openPort[s] + "</td><td><span class=\"label label-success\">open</span></td></tr>"
                    }
                }
                let res_foot = "</tbody></table>"
                let resHtml = res_head + res_body + res_foot;
                $("#res").append(resHtml);

                // 提交按钮状态重置
                $("#con"+id+" > #btn").removeClass("disabled");
                $("#con"+id+" > #btn").val("确定");
                return;
            },
            error:function(e){
                console.log(e);
                alert("数据请求异常！");
                return;
            }      
        });
    });
});