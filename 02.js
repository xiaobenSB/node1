//response.setHeader 与 response.writeHead的区别，通过查看文档与编码测试，发现如下区别：
//前者只能设置单个头的信息，后者可以设置多个
//后者可以设置状态消息与状态文本，前者待定（此处我不确定）
//后者设置的信息将与前者设置的信息合并，一起被发送给客户端
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
