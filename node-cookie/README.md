cookie是请求携带或浏览器F12里Applcation的cookies携带然后当下次浏览器请求的域和携带的cookie域相同时就会添加到该请求头里。<br/>

1. 浏览器的cookie，由于你找不到浏览器发送请求的源码所以不能进行设置cookies,而你可以通过res返回一个如：（res.setHeader('set-cookie','xiaoben=www')）的数据，该数据的作用的是告诉浏览器让它携带cookies，也就是F12里Applcation的cookies,然后当下次浏览器请求跟这个cookies域相同时就会往请求头添加该条cookies数据<br/>

2.你可以自定义请求信息，当然也可以设置cookies，不过这个感觉没多用，因为不是在浏览器里<br/>


注意： 我们用node里的 http.createServer((req, res) => {  }).listen(8080); 创建服务器时,里面回调里的req是用来读取别人发送请求的头信息，
你改这个req是不会对发送请求那边有任何影响，也就算说这个req只是用来读取的，不能设置。而res是返回给该请求数据，然后该请求依据返回的信息来处理渲染。


 res.writeHead(200, {
        'Set-Cookie': 'SSID=Ap4GTEq; Expires=Wed, 13-Jan-2021 22:23:01 GMT;HttpOnly ',
        'Content-Type': 'text/html'
    });
    
    
 设置了HttpOnly属性 我们发现我们还能在控制台看到SSID=Ap4GTEq这个属性，但在前端的js我们查询不到该cookie，后台可以（当然在firebug中能看到）。

Secure属性： 当设置为true时，表示创建的 Cookie 会被以安全的形式向服务器传输，也就是只能在 HTTPS 连接中被浏览器传递到服务器端进行会话验证，如果是 HTTP 连接则不会传递该信息，所以不会被窃取到Cookie 的具体内容。同上，在客户端我们也无法在document.Cookie找到被设置了Secure=true的Cookie键值对。Secure属性是防止信息在传递的过程中被监听捕获后信息泄漏，HttpOnly属性的目的是防止程序获取Cookie后进行攻击。我们可以把Secure=true看成比HttpOnly更严格的访问控制。

path属性： 指定可访问Cookie的目录。例如："userId=320; path=/shop";就表示当前Cookie仅能在shop目录下使用。

domain属性： 指定可访问Cookie的主机名.主机名是指同一个域下的不同主机，例如：www.google.com和gmail.google.com就是两个不同的主机名。默认情况下，一个主机中创建的Cookie在另一个主机下是不能被访问的， 但可以通过domain参数来实现对其的控制，其语法格式为："name=value; domain=CookieDomain";以google为例，要实现跨主机访问，可以写为： "name=value;domain=.google.com";这样，所有google.com下的主机都可以访问该Cookie。

Expires属性：指定过期时间，格式为"name=value;; expires=GMT_String"; 其中GMT_String是以GMT格式表示的时间字符串，超过这个时间，Cookie将消失，不可访问。例如：如果要将Cookie设置为10天后过期，可以这样实现
