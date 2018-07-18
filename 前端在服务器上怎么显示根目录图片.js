前端在服务器上时的根目录对应的是ip,因为页面通过ip渲染出来的
后台里的根目录对应服务器启动的位置

var express = require('express');
var app = express();
var fs = require('fs');
// 设置模板路径，默认为./views
// app.set('views', path.join('views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/', function(req, res) {
  if(req.url.indexOf('.png')!=-1){
    fs.readFile('./views/2.png','binary',function(err, file) {
	if (err) {
	  console.log(err);
	  return;
	}else{
	    res.writeHead(200, {'Content-Type': 'image/jpeg'});
	    res.write(file,'binary');
	    res.end();
	    return;
	} 
	});}
	else {
              res.render('index.html');
            }

})
app.listen(3000, function() {
  console.log('app listen at 3000');
})

前端
<html>
<body>
<img src="./xxx.png" />
</body>
</html>
