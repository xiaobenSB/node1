let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');
let mime = require('mime');
let crypto = require('crypto');
let zlib = require('zlib');



http.createServer(function (req, res) {
    let { pathname } = url.parse(req.url, true);
	if(req.url ==="/"){ res.end('hello');return  }
    let filepath = path.join(__dirname, pathname);

	a.fileCheck(filepath,req,res);
	
   
}).listen(8080);

class fileDateCache{

fileCheck(filepath,req,res){
var that = this;
  fs.stat(filepath, (err, stat) => {
        if (err) {
            return that.sendError(req, res);
        } else {
            let ifNoneMatch = req.headers['if-none-match'];
            let out = fs.createReadStream(filepath);
            let md5 = crypto.createHash('md5');
			
            out.on('data', function (data) {
                md5.update(data);
            });
            out.on('end', function () {
			
	
                let etag = md5.digest('hex');   //md5把文件编译成hex,好处是：字符很少所以大小也变小了，可以设置在响应头里下次请求携带
                if (ifNoneMatch === etag) {
				
                    res.writeHead(304);  //304是返回上次跟它一样请求返回的数据，如：第一次请求ip返回的如果是304就返回空白页，如果是在跟它一样ip的浏览器窗口时，返回304就不会跳转，就显示该ip上次同样ip请求的数据
                    res.end('');
					
					global.gc();
					console.log(process.memoryUsage());
                } else {
                     that.send(req, res, filepath, etag);
                }
            });

        }
    });

}

sendError(req, res) {
    res.end('Not Found');
}

send(req, res, filepath, etag) {
    res.setHeader('Content-Type', mime.getType(filepath));
    res.setHeader('ETag', etag);
	
	this.zlib(req,res,filepath)
}

zlib(request,response,filepath){
     var raw = fs.createReadStream(filepath);  //传路径好解析点。传个对象解析麻烦

	 var acceptEncoding = request.headers['accept-encoding'];
	  if (!acceptEncoding) {   //undefinde原型不是字符串不能用match方法
		acceptEncoding = '';

	  }
	 acceptEncoding = 'gzip'
	  // Note: this is not a conformant accept-encoding parser.
	  // See http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.3
	  //正则匹配来进行判断用什么content-encoding
	  if (acceptEncoding.match(/\bdeflate\b/)) {
		response.writeHead(200, { 'content-encoding': 'deflate' });
		raw.pipe(zlib.createDeflate()).pipe(response);

	  } else if (acceptEncoding.match(/\bgzip\b/)) {
		//先用gzip编码解析数据再用utf-8编码显示
		response.writeHead(200, { 'content-encoding': 'gzip' });
	
		 raw.pipe(zlib.createGzip()).pipe(response);

	  } else {
		response.writeHead(200, {});
		raw.pipe(response);

	  }
	}

};

var a  = new fileDateCache();

/*

res.setHeader( "Pragma", "no-cache" );
res.setHeader( "Cache-Control", "no-cache" );
res.setHeader( "Cache-Control", "max-age=3" ); //这个跟下面no-store同用处，但是请求返回后3秒才会清除缓存
res.setHeader( "Cache-Control", "no-store" );  //这个彻底没有缓存,也就是res设置的ETag等等，下次请求不会带上（res携带的都会清理掉，所以返回的数据都没了，再304就找不到上次请求返回得内容了）


HTML的HTTP协议头信息中控制着页面在几个地方的缓存信息，包括浏览器端，中间缓存服务器端
(如：squid等)，Web服务器端。本文讨论头信息 中带缓存控制信息的HTML页面(JSP/Servlet生成好出来的也是HTML页面)在中间缓存服务器中的缓存情况.HTTP协议中关于缓存的信息头关键字包括Cache-Control(HTTP1.1)，Pragma(HTTP1.0)，last-Modified，Expires等。


no-cache，浏览器和缓存服务器都不应该缓存页面信息，也就是还有缓存；

no-store，请求和响应的信息都不应该被存储在对方的磁盘系统中;

Pragma: no-cache：跟Cache-Control: no-cache相同，Pragma: no-cache兼容http 1.0 ，Cache-Control: no-cache是http 1.1提供的。
因此，Pragma: no-cache可以应用到http 1.0 和http 1.1,而Cache-Control: no-cache只能应用于http 1.1.


pm2 start --node-args="--expose-gc" sub.js

*/
