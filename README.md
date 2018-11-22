node 使用常识
<h3>fs</h3>
在Node读取文件fs方法里，readFile返回buffer,然后你使用返回的Buffer.toSting(),默认是把源文件编码（也就是他自己会先把buffer编译回源编码再）编译为utf8，而类似于图片视频之类的编码，源编码可不是utf8，所以就不能用该（.toSting()）方法,而writeFile方法会自动把buffer数据编译成源文件编码再写入文件里，同样createReadStream以流方式显示读取的文件，里面的.on('data')可以接收以流方式读取的文件数据，但默认也是返回utf8编码的，同样破坏了源文件编码，使用管pipe方法就可以以源文件编码导入可写流里

node的req.url不能匹配路由为#号后面的任意字符，包括#号,也就是会排除#号（所以使用node时，路由得注意下）

<h3>并发和并行</h3>
你吃饭吃到一半，电话来了，你一直到吃完了以后才去接，这就说明你不支持并发也不支持并行。<br/>
你吃饭吃到一半，电话来了，你停了下来接了电话，接完后继续吃饭，这说明你支持并发。  （不一定是同时的）<br/>
你吃饭吃到一半，电话来了，你一边打电话一边吃饭，这说明你支持并行<br/>

<h3>进程和线程</h3>
进程是独立的，类似于funtion,而进程里可以有很多线程（只要你的cpu给力），类似于funtion里要执行的东西，而js是单线程的，也就是进程里开了一个处理js线程，线程是从上到下执行的，而一个进程里有多个线程的话，线程之间是不需要等上个线程执行完才能执行，可同时执行，看谁快就谁先返回结果给该进程。node主进程和子进程应该也是这种关系，可以访问主进程的东西，但子进程和线程彼此之间里面定义的不能访问

node就是一个进程，而里面的模块clust开启进程，就等于调用了cmd，开启另一个进程，而当前调用的进程可以收到这些开启进程的信息，（可能是设置里类似于porcess.stdon控制台打印，都改成当前的控制台打印，而这些进程耗费cpu，如果你电脑好就可以用这个处理大数据并免阻塞，进程超过一定使用率会卡，会崩溃）

<h3>es6 async</h3>
async function 报错不会退出所有的js执行，只是该方法不会继续执行

<h3>node http</h3>
res.end 就是把设置的res信息头和内容返回给浏览器处理，并结束此次连接。

浏览器就是一个可视化工具，里面有很多解析功能来对应数据可视，如设置Content-Type为video/mp4 时，那么浏览器就会用MP4视频解析功能来解析你返回的数据，然后以他里面mp4的显示方式来可视

node-http 用http创建了服务器，当你请求同个路由时（也就是两次或两次以上'req.url === /'）,那么第二次就得等第一次res.end()返回结束才能触发该请求处理，如果第二次是' /? '那就不会，也就是里面是注册了第一次请求，但下次请求相判断注册里有没有，有就等注册里的请求处理完成再处理，没有就注册并处理

编码错误一般是你当前操作的文件格式不符合解析的格式，假如你的文件格式为ANSI，你可以把他编译成uf8，但ANSI转成utf8就会乱码，因为文件的源编码格式为ANSI，而如果你的源文件编码为utf8,你转ANSI，那么你再用ANSI编码解析器来解析ANSI，然后就可以转成utf8 (所以源文件编码不会变，变的只是你在源编码上面加了什么东西，然后在用加了什么东西的解析器来解析文件成未加了东西时候的样子)

当你接收post一个数据处理后返回数据给浏览器时，这时浏览器接收后显示然后你再刷新就会提示是否重新提交表单，因为浏览器缓存了数据，刷新是当前请求重新发送
，而你当前请求缓存了数据（如：req.on(data)），然后你刷新就会携带上（地址栏回车是get的了，而get和post是两种不一样请求，get不会挈带Post数据，只有刷新是当前请求，如当前请求post就发送post请求）

/favicon.ico是http模块创建服务器后浏览器发送的请求，而我们在浏览器上输入网址确定时也是浏览器发送请求（只不过他会多发一个/favicon.ico请求），而他只渲染请求根目录上的返回的值，不渲染/favicon.ico的

在数据传输过程中，json是以文本，即字符串的形式传递的,所以你需要json.stringtfy(对象)再发送数据，不是直接发送json对象的，不然报错或显示为[object object]

node模块之间的引入知识：当一个node进程引入同一个对象模块（2次或以上）时,第一次引入时把对象模块改变了，当第二次引入时获取的就是改变的对象，但如果他们不是在同文件里引入，而不是来自不同文件，虽然第二个文件引入的是第一个改变的，但如果第一次像定时那样变，而第二次如果不想定时那样引入，就只能获取它刚开始引入变得值，因为模块就是一个盒子，谁先引入就排第一盒子，后面引入虽然不可以访问第一个盒子的变量，但reqruie本身等同于全局而且它如果还是个对象，可以被所有的盒子访问到修改的对象值，但是又因为只有第一次才可以引入一个完整的盒子，下次只是从第一次里拿返回的东西，所以下次拿到的如果不是重新引入对象模板，那么他就访问它第一次引入的对象模块，因为他的盒子本身在那个位置但是第二次只返回他定义返回的内容，没有重新再生一个新盒子，对象写法是当他被引用而且被修改了值，那么在修改的后面同样引入这个对象打印结果才会变，而定时引入就是为了获取后面修改的值，这个用来回调时你有不想在回调写太多代码然后用模块来解决非常方便

node的express框架，他对象里的use(这里可能是当服务器打开时就会执行这里的方面，并传了req,res对象参数你就可以扩展他里面req,res内容)，如body-parese就是这样扩展的,为什么可以多个use而不会覆盖呢，可以use函数的参数被push到一个外面数组里，然后就可以不担心覆盖了

webpack babel编译是假如引入后缀名匹配就编译匹配的整个文件，然后引入的的是编译后的，然后整个文件是存在当前这个进程里的，var a = require(xx)的话就是require把整个文件放到进程里处理编译然后从这里面取exports部分来给a用，整个文件就像function那样，里面的变量只给他里面的用，打包的话就会把进程里的东西全都给打包了

<h3>process使用</h3>
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

node爬虫也就是抓取网页某个内容，是抓取不了js里生成dom,因为他抓取过程为：读取整个网页内容后然后再类似正则匹配相应信息，但他并没有能力读取完并执行里面js后在匹配（没有解析js功能）

