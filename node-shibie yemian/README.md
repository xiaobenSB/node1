 var deviceAgent = req.headers["user-agent"].toLowerCase();

    var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
    if(agentID) {
     //手機或者pc
    } else {
        //指到pc网页    
    }

    var ua = req.headers["user-agent"].toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        console.log("微信打開")
    } else {
        console.log("請在微信打開")
    }

---------------------

本文来自 zwwwei 的CSDN 博客 ，全文地址请点击：https://blog.csdn.net/ZWWwei/article/details/66970226?utm_source=copy 
