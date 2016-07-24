var fs = require('fs'),
    path = require('path'),
    http = require('http');
var MIME = {                     //文件类型
    '.css':'text/css',
    '.js':'application/javascript'
}

function combineFiles(pathnames,callback){
    var output = [];

    (function next(i,len){
        if(i<len){
            fs.readFile(pathnames[i],function(err,data){
                if(err){
                    callback(err);
                }else{
                    output.push(data);
                    next(i+1,len);
                }
            })
        }else{
            callback(null,Buffer.concat(output))    //将output内的data，通过二进制Buffer进行合并
        }
    }(0,pathnames.length))
}
function main(argv){
    var config = JSON.parse(fs.readFileSync(argv[0],'utf-8')),
        root = config.root || '.',                    //这个端口之前的地址
        port = config.port || 80;                     //这个是返回输入的端口

    http.createServer(function(request,response){
        var urlInfo = parseURL(root,request.url);       //request.url   就是地址栏输入的地址

        combineFiles(urlInfo.pathnames,function(err,data){
            if(err){
                response.writeHead(404);
                response.end(err.message);
            }else{
                response.writeHead(200,{
                    'Content-Type':urlInfo.mime
                })
                response.end(data);
            }
        })

    }).listen(3000);
}
function parseURL(root,url){
    var base,pathnames,parts;
    if(url.indexOf('??')==-1){
        url = url.replace('/','/??')      //不存在/？？的时候，将url的？转换成/？？
    }

    parts = url.split('??');
    base = parts[0];
    pathnames = parts[1].split(',').map(function(value){
        return path.join(root,base,value);
    })

    return{
        mime:MIME[path.extname(pathnames[0])]||'text/plain',   //extname是获取.后边的文件格式（类型的）
        pathnames:pathnames
    }
}
main(process.argv.slice(2));   //process.argv 这是命令行参数的数组。第一个元素是'node' 第二个元素是执行的js文件名 第三个元素是命令行传入的参数
