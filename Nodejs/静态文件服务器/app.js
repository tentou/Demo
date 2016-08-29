/**
 * 创建静态服务器
 *
 * Created by zhangpeng on 2016/8/29.
 */
var http = require('http');
var parse = require("url").parse;  //以后可以通过parse("url")来解析url
var join = require("path").join;    //以后可以通过join(root,...)来合并路径
var fs = require("fs");

var root = __dirname;

var server = http.createServer(function (req,res) {

    var url = parse(req.url);
    var path = join(root,url.pathname);
    var stream = fs.createReadStream(path);     //通过访问流文件
    stream.on('data',function(chunk){
        res.write(chunk);                       //
    })
    stream.on('end',function(){
        res.end();
    })
    stream.on('error',function(){
        res.statusCode = 500; //服务器错误
        res.end();
    })
    //可以缩写
    //var readStream = fs.createReadStream(path);
    //      //var writeStream = fs.createWriteStream("./a.txt");   //这个用来写入到文件，如果响应的话可以像下边这么写
    //readStream.pipe(res);

});
server.listen(8888);
console.log('Server running at http://127.0.0.1:8888/');
