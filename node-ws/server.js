var http = require('http');
var WebSocket = require('./ws');
var fs = require('fs');
// HTTP服务器部分
var server = http.createServer(function(req, res) {
  res.end('websocket test\r\n');
});

console.log('starting...');

// Upgrade请求处理
server.on('upgrade', callback);
var b ='';
function callback(req, socket, upgradeHead) {
  var ws = new WebSocket(req, socket, upgradeHead);
  // ws.keepLive(); // 保持心跳连接，否则一般经过一定的时间没有数据交互，浏览器端会主动关闭 ws 链接
  ws.on('data', function(opcode, payload) {
    console.log('receive data:', opcode, payload);
	//for(var i=0;i<127;i++){b = b+'1'}ws.send(b)
		fs.readFile('./hah2.png',function(err,data){
			ws.send(data);
		})
    
  });


  ws.on('close', function(code, reason) {
    console.log('close:', code, reason);
  });

}

server.listen(3000);


/*const buf = Buffer.allocUnsafe(4);
buf.writeUInt16BE(0xdead, 0);
buf.writeUInt16BE(0xbeef, 2);

// buf: <Buffer de ad be ef>

console.log(buf.readUInt16BE(0)); //0xdead == 57005  */
