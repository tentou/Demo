/**
 * Created by zhangpeng on 2016/8/30.
 */
//相片路由
var express = require('express');
var router = express.Router();
var path = require('path');
var formidable = require('formidable');   //解析上传文件
var form = new formidable.IncomingForm();
form.uploadDir = "tmp";
var fs = require('fs');

//创建一些假数据
var photos = [];
photos.push({
    name:"zhp",
    path:"http://js.rrsub.net/images/logo.png"
})

router.get('/',function (req,res,next) {        //这个 /  是路径
    res.render('index', {          //index是模板文件名
        title: 'Photos',        //这里的title是对象，不是某个对象的属性
        photos: photos          //这里的photos是对象，不是某个对象的属性
    })
});
router.get('/upload',function (req,res,next) {   ////请求图片路由
    res.render('upload',{
        title:'Photo upload'
    })

});
//提交图片路由
router.post('/upload',function (req,res,next) {
    var newPath = path.resolve(__dirname, '..');
    form.parse(req,function(error, fields, files){
        //console.log(files.image);
        // var readStream=fs.createReadStream(files.image.path);
        // var writeStream=fs.createWriteStream(newPath+'/public/photos');
        // readStream.pipe(writeStream);
        // readStream.on('end',function(){
        //     fs.unlinkSync(files.image.path);
        // });
        //     res.writeHead(200, {"Content-Type": "text/html"});
        //     res.write("received image:<br/>");
        //     res.end();
        fs.rename(files.image.path,newPath+'/public/photos/'+files.image.name,function () {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write("received image:<br/>");
            res.end();
        });
    });
    // form.on('progress', function(bytesReceived, bytesExpected) {
    //     console.log(bytesReceived);
    // });
    // form.on('file', function(error, fields, files) {
    //     console.log(files.image.path);
    // })
    // form.on('end', function() {
    //     console.log("end")
    // });
    // var name = req.body.name;
    // var img = req.body.image;
    // var imgFile = req.files;
    // var oldPath = file;
    // form.uploadDir = __dirname+'/public/photos';
    // var imgNewPath = path.join(__dirname+'/public/photos',img);       //img.name是原文件名
    // console.log(form.uploadDir);
    // console.log(oldPath);
    //console.log(img.path);
    //console.log(imgNewPath)
    // fs.name(img.path,path,function (err) {      //img.path是原文件地址
    //     var photo = new Photo();
    //     photo.create({
    //         name:name,
    //         path:img.name
    //     },function (err) {
    //         console.log(err);
    //     })
    //
    // })
});
module.exports = router;