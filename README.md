node 使用常识

编码错误一般是你当前操作的文件格式不符合解析的格式，假如你的文件格式为ANSI，你就算用什么iconv-lite想把它变为utf8，那是不可能的，我们设置的编码（res.writeHead）一般都是以什么编码去解析返回（你的文件格式和解析时编码不一样怎么解析），所以不是把ANSI转化成utf8的

/favicon.ico是http模块创建服务器后自动发送的请求，由于node不可以在一个请求里获取另一个不是在当前请求里的请求的数据，所以无法显示/favicon.ico的返回数据，因为是当前请求自动发送的请求,而当前的请求已经渲染数据，所以就算自动发送请求返回什么也渲染不到了

在数据传输过程中，json是以文本，即字符串的形式传递的,所以你需要json.stringtfy(对象)再发送数据，不是直接发送json对象的，不然报错

node模块之间的引入知识：当一个node进程引入同一个对象模块（2次或以上）时,第一次引入时把对象模块改变了，当第二次引入时获取的就是改变的对象，但如果他们不是在同文件里引入，而不是来自不同文件，虽然第二个文件引入的是第一个改变的，但如果第一次像定时那样变，而第二次如果不想定时那样引入，就只能获取它刚开始引入变得值，因为模块就是一个盒子，谁先引入就排第一盒子，后面引入虽然不可以访问第一个盒子的变量，但可以reqruie返回的等同于全局，可以被所有的盒子访问到，但是又因为只有第一次才可以引入一个完整的盒子，下次只是从第一次里拿返回的东西，所以下次拿到的如果不是重新引入对象模板，那么他就访问它第一次引入的对象模块，因为他的盒子本身在那个位置但是第二次只返回他定义返回的内容，没有重新再生一个新盒子，这个用来回调时你有不想在回调写太多代码然后用模块来解决非常方便

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


request模块可以请求地址并返回请求内容的数据对象，并不是单单只返回内容，所以跨域是不存在，而且可以把请求的数据对象包写在相同文件格式的可写流文件里，因为返回的是可读流（本地是http:127.0.0.1（这里可以localhost）:3000,不是单单localhost:3000，因为我们在浏览器上输入的是前面有http了不用我们输入了）

images模块可以把一张图片重新设置宽高和清晰度，也可以把两张图片绘制成一张，然后生成一个新的图片

http和ajax请求，http请求主要分http和https请求所以对应两个模块,而ajax有跨域的问题

exports是继承module.exports的,最后node只会解析module.exports，所以在同个文件里声明module.exports会覆盖掉exports
