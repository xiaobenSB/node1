<h3>全局Global（Gb）与局部local（Lc）</h3>
node 使用常识

<h3>服务器返回各种文件给浏览器前的content-type内容类型（也就是该文件类型或者该数据类型）输写大全</h3>
链接: http://tool.oschina.net/commons/   <br/>
前端实现在线预览pdf、word、xls、ppt等文件  <br/>
链接: https://juejin.im/post/5a7badf26fb9a063353198a1?utm_medium=hao.caibaojian.com&utm_source=hao.caibaojian.com


<h3>字符编码与buffer</h3>
不准确的：encode（码，utf8编码格式）（等同于node的Buffer.from(码，utf8编码格式);）该码以utf8编码方式来编写（如果用其他编码方式的码，utf8可能识别不了）<br />
不准确的：decode（码，utf8编码格式）（等同于node的buf.toString(utf8编码方式)）该码解析（转换）为 utf8编码方式（ANSI可以转换为GB2312，记事本文件打开就是先把ANSI转换成GB2312再呈现给我们的，文件内容源编码是ANSI的），然后再以utf8编码格式来编写<br />
<br />
uft8编码类型buffer是当前数据被buffer方法里设置的buffer之utf8转码进行转换
tostring('uft8')是当前buffer数据被buffer方法里设置的buffer之utf8解码进行转换
Node.js 目前支持的字符编码包括：

Latin1是ISO-8859-1的别名，有些环境下写作Latin-1。ISO-8859-1编码是单字节编码，向下兼容ASCII，其编码范围是0x00-0xFF，0x00-0x7F之间完全和ASCII一致，0x80-0x9F之间是控制字符，0xA0-0xFF之间是文字符号。

ANSI是一种字符代码，为使计算机支持更多语言，通常使用 0x00~0x7f 范围的1 个字节来表示 1 个英文字符。超出此范围的使用0x80~0xFFFF来编码，即扩展的ASCII编码。（即扩展代表ANSI有些ASCII没有，所以不能用node里的ascii）


ascii - 仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的。

utf8 - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8 。

utf16le - 2 或 4 个字节，小字节序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。

ucs2 - utf16le 的别名。

base64 - Base64 编码。（把图片的二进制编码为base64编码,可以被前端的background-image:url(base64)和img src解析成原本数据，减少服务器请求，Base64编码可用于在HTTP环境下传递较长的标识信息。<h5>data:image/jpg;base64,数据 这段</h5>说明了url和src发起http请求，可以被http请求解析并返回里面的数据（过程：http请求 - 解析地址然后发现是data:image/jpg,所以response设置contype-type并且发现了base64,就知道该数据编码是base64，从而解码写到response）<h5>从而体现这段等同一个服务器</h5>）

latin1 - 一种把 Buffer 编码成一字节编码的字符串的方式。（低版本node不支持，低版本得改用binary）

binary - latin1 的别名。

hex - 将每个字节编码为两个十六进制字符。

node会把读取或写入数据先转化成buffer(它写入的方法最后可能会调用解Buffer编码方法，因为别人不认识buffer，就像res.end(如果真的返回buffer,浏览器不知能自己解析成字符串不)，fs.writeFile源码里是先转成buffer，无论是buffer还是字符串,可能里面最后调用哪个方法解吧)，如fs.readFile,fs.writeFile，res.end等等(fs.writeFile可以设置是转成包含 哪种 字节编码的buffer),（读取数据）node转成buffer的包含哪种字符编码是根据该文件的源字符编码设置的，如图片或视频是ANSI，那么就对应latin1或binary，文本保存为utf8就为utf8。（写入数据）<h4>如果数据是buffer，那么node自己会该buffer处理的，如果是字符窜，那么默认会转成utf8的buffer。res.end可以设置（res.end(data.toString('latin1'),'latin1')），fs.writeFile可以设置</h4>。简单来说就是图片是一种ANSI的编码，如果转成utf8数据就不能识别，同样中文utf8能识别，而ANSI不能识别（也就是utf8识别不了ANSI某些编码，ANSI识别不了uft8默些编码）<br/>总结：<h4>就是使用node res.end或res.writeFile时，如果传的参数是字符串他就会先编译成buffer然后才编译成字符窜进行写入，默认字符串编译成utf8的buffer,如果传的是buffer，那node自己会解析出他是什么类型的buffer来替换默认的utf8</h4>
base64编码只对是图片（二进制）的buffer生效，也就是你读取图片，图片为二进制buffer,你就可以toString('base64')


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
post和get请求里添加的数据方式不同,数据类型可以发送只要是数字或英文字母或字符的字符串,但方式get只能是?xx=xx&xx=xx，而post，如xmlhttp.open("POST","ajax_test.asp",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send(JSON.stringify(a)||'www'||'111'||'+=%'); 如果你要发送中文，可以把中文转化成英文字母 如 encodeURI(中文);

res.end 就是把设置的res信息头和内容返回给浏览器处理。

浏览器就是一个可视化工具，里面有很多解析功能来对应数据可视，如设置Content-Type为video/mp4 时，那么浏览器就会用MP4视频解析功能来解析你返回的数据，然后以他里面mp4的显示方式来可视

node-http 用http创建了服务器，当你请求同个路由时（也就是两次或两次以上'req.url === /'）,那么第二次就得等第一次res.end()返回结束才能触发该请求处理，如果第二次是' /? '那就不会，也就是里面是注册了第一次请求，但下次请求相判断注册里有没有，有就等注册里的请求处理完成再处理，没有就注册并处理

编码错误一般是你当前操作的文件格式不符合解析的格式，假如你的文件格式为ANSI，你可以把他编译成uf8，但ANSI转成utf8就会乱码，因为文件的源编码格式为ANSI，而如果你的源文件编码为utf8,你转ANSI，那么你再用ANSI编码解析器来解析ANSI，然后就可以转成utf8 (所以源文件编码不会变，变的只是你在源编码上面加了什么东西，然后在用加了什么东西的解析器来解析文件成未加了东西时候的样子)

当你接收post一个数据处理后返回数据给浏览器时，这时浏览器接收后显示然后你再刷新就会提示是否重新提交表单，因为浏览器缓存了数据，刷新是当前请求重新发送
，而你当前请求缓存了数据（如：req.on(data)），然后你刷新就会携带上（地址栏回车是get的了，而get和post是两种不一样请求，get不会挈带Post数据，只有刷新是当前请求，如当前请求post就发送post请求）

/favicon.ico是http模块创建服务器后浏览器发送的请求，而我们在浏览器上输入网址确定时也是浏览器发送请求（只不过他会多发一个/favicon.ico请求），而他只渲染请求根目录上的返回的值，不渲染/favicon.ico的

在node res.end数据传输过程中，json是以文本，即字符串的形式传递的(""+你传递的参数),所以你需要json.stringtfy(对象)再发送数据，不是直接发送json对象的，不然报错或显示为[object object]

node模块之间的引入知识：当一个node进程引入同一个对象模块（2次或以上）时,第一次引入时把对象模块改变了，当第二次引入时获取的就是改变的对象，但如果他们不是在同文件里引入，而不是来自不同文件，虽然第二个文件引入的是第一个改变的，但如果第一次像定时那样变，而第二次如果不想定时那样引入，就只能获取它刚开始引入变得值，因为模块就是一个盒子，谁先引入就排第一盒子，后面引入虽然不可以访问第一个盒子的变量，但reqruie本身等同于全局而且它如果还是个对象，可以被所有的盒子访问到修改的对象值，但是又因为只有第一次才可以引入一个完整的盒子，下次只是从第一次里拿返回的东西，所以下次拿到的如果不是重新引入对象模板，那么他就访问它第一次引入的对象模块，因为他的盒子本身在那个位置但是第二次只返回他定义返回的内容，没有重新再生一个新盒子，对象写法是当他被引用而且被修改了值，那么在修改的后面同样引入这个对象打印结果才会变，而定时引入就是为了获取后面修改的值，这个用来回调时你有不想在回调写太多代码然后用模块来解决非常方便

node的express框架，他对象里的use(这里可能是当服务器打开时就会执行这里的方面，并传了req,res对象参数你就可以扩展他里面req,res内容)，如body-parese就是这样扩展的,为什么可以多个use而不会覆盖呢，可以use函数的参数被push到一个外面数组里，然后就可以不担心覆盖了

webpack babel编译是假如引入后缀名匹配就编译匹配的整个文件，然后引入的的是编译后的，然后整个文件是存在当前这个进程里的，var a = require(xx)的话就是require把整个文件放到进程里处理编译然后从这里面取exports部分来给a用，整个文件就像function那样，里面的变量只给他里面的用，打包的话就会把进程里的东西全都给打包了

<h3>（只限）node里console.log的技巧</h3>
91红 92绿色 93黄 94蓝 95洋红 96青 97白（就设置前面\033[这里  后面的\033[39m不动）  <br/>
console.log('\033[91m   server listening on *:3000\033[39m');


<h3>process使用</h3>
process等同于node进程

var server=http.createServer(app).listen(process.env.POR||8800);  //process.env.POR  window下 process.env == set 后面可以任意名process.env.xxx == set xxx

//监听当前进程触发事件
process.on('uncaughtException', function (err) {  //拦截进程的报错信息并处理（只能执行一个该监听方法，pm2里可能监听了，所以不需要自己设置了），可以设置重开一个进程防止服务器退出,但如果是该进程立即执行的代码报错就会出现无限重开状况
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

