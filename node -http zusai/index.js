
var EventProxy = require('eventproxy');
var proxy = new EventProxy();


var status = "ready";
var i = 0 ;
var select = function(res){
i++;
console.log(222222222222)
//注册
  proxy.once("selected",function(data){   //不能用外面变量方法，因为res至关重要，而proxy回调执行的是function的话会找到这里
  
	res.end(''+data+'');
	console.log(111111111111111111);
  });
  if(status == "ready"){

  	status = "pending";
  	setTimeout(function(){
  		proxy.emit("selected",i);   //执行所以注册的selected
		status = "ready";
		
  		
  	},5000);
  }
}






const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
var a = /\/a/;   //验证路由是/a或/axxxxx

const server = http.createServer((req, res) => {
if(req.url === '/favicon.ico'){  return }

if(a.test(req.url)) {  select(res) }

 
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
