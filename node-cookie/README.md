cookie是请求携带或浏览器F12里Applcation的cookies携带然后当下次浏览器请求的域和携带的cookie域相同时就会添加到该请求头里。<br/>

1. 浏览器的cookie，由于你找不到浏览器发送请求的源码所以不能进行设置cookies,而你可以通过res返回一个如：（res.setHeader('set-cookie','xiaoben=www')）的数据，该数据的作用的是告诉浏览器让它携带cookies，也就是F12里Applcation的cookies,然后当下次浏览器请求跟这个cookies域相同时就会往请求头添加该条cookies数据<br/>

2.你可以自定义请求信息，当然也可以设置cookies，不过这个感觉没多用，因为不是在浏览器里<br/>


注意： 我们用node里的 http.createServer((req, res) => {  }).listen(8080); 创建服务器时,里面回调里的req是用来读取别人发送请求的头信息，
你改这个req是不会对发送请求那边有任何影响，也就算说这个req只是用来读取的，不能设置。而res是返回给该请求数据，然后该请求依据返回的信息来处理渲染。
