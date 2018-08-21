const http = require('http');

// Create an HTTP server
const srv = http.createServer((req, res) => {

if(req.url==="/favicon.ico"){  return }

console.log(req.headers)
  res.setHeader('set-cookie','xiaoben=www');  

  res.end('okay');
});


// now that server is running
srv.listen(1337, '127.0.0.1');








