var express = require('express');
var router = express.Router();
var user = require('../lib/user');


/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('register',{
        title:'Register'
  })
  // res.send('respond with a resource');
});
router.post('/register',function (req,res,next) {
    var data = req.body.user;   //获取提交的对象

    //从数据库中获取user.name,并且与传入的user.name做比较
    getByName(data.name,function(){
        if(user.id){        //加入这个id已经存在了，提示
            res.error('Username already taken!')
        }
    })

})
module.exports = router;
