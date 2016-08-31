/**
 * Created by zhangpeng on 2016/8/30.
 */
//相片路由
var express = require('express');
var router = express.Router();
var path = require('path');


//创建一些假数据
// var photos = [];
// photos.push({
//     name:"zhp",
//     path:"http://js.rrsub.net/images/logo.png"
// })

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
    var name = req.body.name;
    var img = req.body.image;
    var imgFile = req.files;
    var imgNewPath = path.join(__dirname+'/public/photos',img);       //img.name是原文件名
    console.log(imgNewPath);
    console.log(imgFile);
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