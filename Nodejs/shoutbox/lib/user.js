/**
 * 创建用户模型
 * 通过用户:ids→生成→id
 * 通过用户名→关联→id
 * 通过用户:id →用户的所有信息
 * Created by zhangpeng on 2016/9/1.
 */
var redis = require('redis');
//var bcrypt = require('bcrypt');
var db = redis.createClient(6379,'127.0.0.1');

// db.set('color','red');
// db.get('color',function (err,value) {
//     console.log(value);
// })


function User(obj) {
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            this[key] = obj[key];
        }
    }
}

//User需要有存储功能
User.prototype.save = function (fn) {
    if(this.id){        //判断用户已经存在的话
        this.update(fn);      //升级这个用户信息,可以理解为原来没有填写手机号，this内新包含了新手机号，通过update来新增加手机号信息
    }else{
        var user = this;
        db.incr('user:ids',function (err,id) {      //incr 会判断user:ids这个键值是id，这个id会先被初始化为 0 ，然后逐个+1
            user.id = id;
            user.hashPassword(          //设置user的密码
                user.update(fn)         //将user.update()传给hashPassword函数,放在这个位置是为了同步操作，否则的话因为异步操作，有可能直接更新了信息，但是还没有做加密
            )
        })
    }
}
//User需要有更新信息的功能
User.prototype.update = function (fn) {
    var user = this;
    var id = user.id;
    db.set('user:id:'+user.name,id,function () {            //将user:id:zhp 关联到0 这个id上，这是一个存储的键值对--目的：方便通过名字查找
        db.hmset('user:'+id,user,function () {          //这里是给user:zhp赋值属性，属性为更新后的user
            //存储后的执行程序
            fn();
            console.log('-----存储成功-----')
        })
    })
}
User.prototype.hashPassword = function(fn){
    console.log('-----密码加盐成功-----')
}
//伪数据测试
var zhp = {
    name:'zhp',
    password:123
}
var zhpData = new User(zhp);

zhpData.save(function () {
    console.log('-----更新完成----');
    console.log(zhpData);
    // db.hgetall('user:8',function(value) {
    //      console.log(value)
    // })

});

//用户提交用户名和密码登陆认证的过程
//认证用户
// function getByName() {
//     db.hgetall('user:9',function(value){
//         console.log(value)
//     })
//     //
//     // db.get('user:id:'+name,function (value) {
//     //     console.log('打印user:id:zhp的id为'+value)
//     //     db.hgetall('user:'+value,function(user){
//     //         console.log(user);
//     //         fn();             //这个fn其实就是获取到用户后进行验证的
//     //     })
//     // })
// }
// getByName();
// getByName('zhp',function () {
//     console.log('hehe')
//
// });
//module.exports = User;