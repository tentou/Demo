/**
 * 创建用户模型
 * Created by zhangpeng on 2016/9/1.
 */
var redis = require('redis');
//var bcrypt = require('bcrypt');
var db = redis.createClient();

// db.set('color','red');
// db.get('color',function (err,value) {
//     console.log(value);
// })

var User = function () {

}

//User需要有存储功能
User.prototype.save = function () {
    if(this.id){        //判断用户已经存在的话
        this.update();      //升级这个用户信息
    }else{
        var user = this;
        db.incr('user:ids',function (err,id) {      //incr 会判断user:ids这个键值是id，这个id会先被初始化为 0 ，然后逐个+1
            user.id = id;
            user.hashPassword(          //设置user的密码
                user.update()         //将user.update()传给hashPassword函数
            )
        })
    }
    
}
//User需要有更新信息的功能

module.exports = User;