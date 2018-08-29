var http = require('http'),
    inspect = require('util').inspect;
 
var Busboy = require('busboy');
 
http.createServer(function(req, res) {
  if (req.url === '/favicon.ico') { res.end('1');return }
  if (req.method === 'POST') {
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
      file.on('data', function(data) {
        console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
      });
      file.on('end', function() {
        console.log('File [' + fieldname + '] Finished');
      });
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    });
    busboy.on('finish', function() {
      console.log('Done parsing form!');
      res.writeHead(303, { Connection: 'close', Location: '/' });  //post发送/请求
      res.end('<h1>www</h1>'); //上面的Location直接跳转了然后某个值为false了，没有处理这里返回数据,但end是必须，要断开这个请求
	  console.log(1);
    });
    req.pipe(busboy);
  } else if (req.method === 'GET') {
    res.setHeader('set-cookie','xiaoben=www');

res.setHeader('Last-Modified', 'Tue, 28 Aug 2018 06:41:18 GMT');
    res.writeHead(200, { Connection: 'close' });
    res.end('<html><head></head><body>\
               <form action="/a" method="POST" enctype="multipart/form-data">\
                <input type="text" name="textfield"><br />\
                <input type="file" name="filefield"><br />\
                <input type="submit">\
              </form>\
            </body></html>');
  }
}).listen(8000, function() {
  console.log('Listening for requests');
});
 
// Example output, using http://nodejs.org/images/ryan-speaker.jpg as the file:
//
// Listening for requests
// File [filefield]: filename: ryan-speaker.jpg, encoding: binary
// File [filefield] got 11971 bytes
// Field [textfield]: value: 'testing! :-)'
// File [filefield] Finished
// Done parsing form!
