var http = require('http');
var fs  = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};         //用作缓存

//404错误
function send404(response) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: resource not found.');
  response.end();
}

//返回文件
function sendFile(response, filePath, fileContents) {
  response.writeHead(
    200, 
    {"content-type": mime.lookup(path.basename(filePath))}
  );
  response.end(fileContents);
}

//服务器静态文件的 逻辑 操作
function serveStatic(response, cache, absPath) {
  if (cache[absPath]) {              //判断缓存是否存在
    sendFile(response, absPath, cache[absPath]);
  } else {
    fs.exists(absPath, function(exists) {   //判断文件是否存在
      if (exists) {
        fs.readFile(absPath, function(err, data) {  //存在的话就读取文件
          if (err) {
            send404(response);
          } else {
            cache[absPath] = data;          //将这个文件数据data缓存到cache
            sendFile(response, absPath, data);
          }
        });
      } else {
        send404(response);
      }
    });
  }
}

var server = http.createServer(function(request, response) {
  var filePath = false;

  if (request.url == '/') {
    filePath = 'public/index.html';       //设置文件地址
  } else {
    filePath = 'public' + request.url;    //设置文件地址为 publish+请求地址
  }

  var absPath = './' + filePath;          //设置成服务器可以读取的地址格式
  serveStatic(response, cache, absPath);
});

server.listen(3000, function() {
  console.log("Server listening on port 3000.");
});

var chatServer = require('./lib/chat_server');   //一定要写在这里  因为下边的listen被重写了
chatServer.listen(server);
