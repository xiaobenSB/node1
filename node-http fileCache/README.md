304，如：第一次请求ip返回的如果是304就返回空白页，如果是在跟它一样ip的浏览器窗口时(也就是上次请求缓存了，清除缓存的话就第一次请求了)，返回304就显示该ip上次在浏览器请求返回的数据，而我这里用到判断ETag生成的if-none-match是否存在，是因为ETag是上次请求返回的，而浏览器是保存了ETag下次会携带（同样也会保存该请求返回的数据）
<br/>
   res.writeHead(303, { Connection: 'close', Location: '/' });303是跳转到设置的location的get请求
<br/>
<br/>
注意这个清除缓存设置：	res.setHeader( "Pragma", "no-cache" );res.setHeader( "Cache-Control", "no-cache" );res.setHeader( "Cache-Control", "no-store" ); 这些只是针对 res.setHeader('ETag', 'www'); res.setHeader('Last-Modified', 文件修改时间);这些信息缓存设置，这些设置是告诉下次请求如果跟这个是一样地址请求就让请求头携带上，而设置清除缓存设置就只是告诉浏览器下次请求不要携带这些这些的，像cookie,请求头的数据等等是不会清除的
