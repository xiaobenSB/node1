node 使用常识

编码错误一般是你当前操作的文件格式不符合解析的格式，假如你的文件格式为ANSI，你就算用什么iconv-lite想把它变为utf8，那是不可能的，我们设置的编码（res.writeHead）一般都是以什么编码去解析返回（你的文件格式和解析时编码不一样怎么解析），所以不是把ANSI转化成utf8的

/favicon.ico是http模块创建服务器后自动发送的请求，由于node不可以在一个请求里获取另一个不是在当前请求里的请求的数据，所以无法显示/favicon.ico的返回数据，因为是当前请求自动发送的请求,而当前的请求已经渲染数据，所以就算自动发送请求返回什么也渲染不到了

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


request模块可以请求地址并返回请求内容的数据对象，并不是单单只返回内容，所以跨域是不存在，而且可以把请求的数据对象包写在相同文件格式的可写流文件里，因为返回的是可读流（这个模块好像可以请求所有的地址（本地和dns解析过的））

http和ajax是两种不同的请求，http请求只能请求dns解析过的域名,也就是http或https开头的，ajax可以请求本地或者是dns解析过得，但ajax有跨域的问题
