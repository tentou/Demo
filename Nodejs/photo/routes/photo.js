/**
 * Created by zhangpeng on 2016/8/30.
 */
//相片路由
var express = require('express');
var router = express.Router();

var photos = [];            //创建一些假数据
photos.push({
    name:"zhp",
    path:"http://js.rrsub.net/images/logo.png"
})
router.get('/',function (req,res,next) {        //这个 /  是路径
    res.render('index', {          //index是模板文件名
        title: 'Photos',        //这里的title是对象，不是某个对象的属性
        photos: photos          //这里的photos是对象，不是某个对象的属性
    })
})

module.exports = router;