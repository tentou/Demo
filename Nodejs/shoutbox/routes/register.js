var express = require('express');
var router = express.Router();
var User = require('../lib/user');


/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('register',{
        title:'cuola',
      // msg:'nima'
  })
  // res.send('respond with a resource');
});
router.post('/register',function (req,res,next) {
    var data = req.body   //获取提交的对象
    //console.log(data);
    //从数据库中获取user.name,并且与传入的user.name做比较
    User.getByName(data.name,
        function(){
        // if(user.id){        //假如这个id已经存在了，提示
        //     //res.error('Username already taken!');
        //     console.log('到用户已经存在这部了')
        //     // res.render('messages',{
        //     //     mssg:'用户已经存在了！！'
        //     // })
        // }else{
            newUser = new User({
                name:data.name,
                pass:data.pass
            })
            newUser.save(function (err) {
                console.log('到注册成功这部了')
                //req.session.uid = req.id;
                res.render('register',{
                    title:'注册成功了',
                    msg:'注册成功！！'
                })
            });
        // }
    },function(){
            res.render('register',{
                title:'注册失败了',
                msg:'已经注册过了啊！！'
            })
    })

})
module.exports = router;
