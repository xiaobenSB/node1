node 使用常识

/favicon.ico是http模块创建服务器后自动发送的请求，由于node不可以在一个请求里获取另一个不是在当前请求里的请求的数据，所以无法显示/favicon.ico的返回数据

process等同于控制台

var server=http.createServer(app).listen(process.env.POR||8800);  //process.env.POR  window下 process.env == set 后面可以任意名process.env.xxx == set xxx

//监听当前控制台触发事件
process.on('uncaughtException', function (err) {  //拦截控制台的报错信息并处理，防止退出 虽然不会退出但错误语句后面也不执行
　　console.log('Caught exception: ' + err);  
}); 

process.on('SIGNAL_ONE', function(data){  //监听自定义事件并接受
    console.log(data);
});

process.emit("SIGNAL_ONE","欢迎使用process.env.POR或8800端口");   //触发事件并发送参数
