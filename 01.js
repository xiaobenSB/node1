const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {    //cluster引入就执行的
  console.log(`主进程 ${process.pid} 正在运行`);

  // 衍生工作进程。
  for (let i = 0; i < numCPUs; i++) {  //循环触发工作进程执行
    cluster.fork();  //工作进程执行
  }

  cluster.on('exit', (worker, code, signal) => {  //退出触发结束工作
    console.log(`工作进程 ${worker.process.pid} 已退出`);
  });
}  else {
  // 工作进程可以共享任何 TCP 连接。
  // 在本例子中，共享的是一个 HTTP 服务器。
  // 上面的工作进程执行多少次这里就执行多少次
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('你好世界\n');
  }).listen(8000);

  console.log(`工作进程 ${process.pid} 已启动`);
} 
wowoo 
