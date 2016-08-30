/**
 * Created by zhangpeng on 2016/8/30.
 */
//相片路由
var express = require('express');
var router = express.Router();

var photos = [];            //创建一些假数据
photos.push({
    name:"zhp",
    path:"https://nodejs.org/static/images/logos/nodejs-new-white-pantone.png"
})
router.get('/',function () {        //这个 /  是路径
    res.render('photos', {          //photots是对象名
        title: 'Photos',
        photos: photos
    })
})

module.exports = router;