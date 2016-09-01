/**
 * Created by zhangpeng on 2016/8/30.
 */
//相片路由
var express = require('express');
var router = express.Router();
var path = require('path');
var formidable = require('formidable');   //解析上传文件
var form = new formidable.IncomingForm();
form.uploadDir = "tmp";         //这一步是将文件缓存到当前运行目录下tmp文件夹下,因为rename只能操作同一硬盘下的文件,否则的话就用stream

var fs = require('fs');
var Photo = require('../models/Photo');

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

    //formidable插件
    form.parse(req,function(error, fields, files){
        // console.log('fields',fields);       //表单传递的input数据
        // console.log('files',files);         //上传文件数据

        var reqBodyName = fields.name;
        var newPathDir = path.resolve(__dirname, '..');   //返回到photo文件夹
        var oldPath = files.image.path;
        var newPath = newPathDir+'/public/photos/'+files.image.name;
        var dataImgPath = '/photos/'+files.image.name;

         console.log(newPath)

        //移动文件方法一：
        // var readStream=fs.createReadStream(files.image.path);
        // var writeStream=fs.createWriteStream(newPath+'/public/photos');
        // readStream.pipe(writeStream);
        // readStream.on('end',function(){
        //     fs.unlinkSync(files.image.path);
        // });

        //移动文件方法二：
        fs.rename(oldPath,newPath,function () {

            //存入数据库
            Photo.create({
                name:reqBodyName,
                path:dataImgPath
            });
            res.redirect('/uploadend');  //重定向-放在这里是为了在跳转后显示最后一次插入的数据，否则的话，因为异步，可能会导致最后插入的图片不显示
        });

    });

});
router.get('/uploadend',function (req,res,next) {
    Photo.find({},function (err,photos) {
        res.render('uploadend', {
            title:'hehe',
            photos:photos
        })
    })
    // res.write("上传成功")
    // res.end("end");

})
router.get('/photo/:id/download',function (req,res,next) {
    var id = req.params.id;  //取路由的id值  /user/:id
    var newPathDir = path.resolve(__dirname, '..');   //返回到photo文件夹
    var pathDown = newPathDir+'/public';
    Photo.findById(id,function (err,photo) {
        var path = pathDown+photo.path;
        res.sendfile(path);   //传输文件
        //res.download(path); //提示保存
    })
    
})
module.exports = router;