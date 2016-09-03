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

//数据库连接测试
// db.set('color','red');
// db.get('color',function (err,value) {
//     console.log(value);
// })
db.on('connect',function () {
    console.log('数据库连接成功')
})

function User(obj) {
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            this[key] = obj[key];
        }
    }
}

//User需要有存储功能
User.prototype.save = function (fn) {
    if(this.id){        //判断用户已经存在的话,用来修改用户密码用的
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
    fn;
}

//用户提交用户名和密码登陆认证的过程
//认证用户
User.getByName =function(name,noName,haveName) {
    db.get('user:id:'+name,function (err,value) {
        //value 获取的是user:id:name 对应的id值
        if(!value){
            noName();
        }else{
            haveName();
        }
        // db.hgetall('user:'+value,function(err,user){
        //     //user 是user:id 所对应的哈希表的数据，其实就是对象user
        //     //console.log(user);
        //     // if(pass = user.password){
        //     //     console.log('验证通过')
        //     // }
        //     fn();             //这个fn其实就是获取到用户后进行验证的
        // })
    })
}

// getByName('zhp',function () {
//     console.log('hehe')
//
// });

//伪数据测试
// var zhp = {
//     name:'zhp',
//     password:123
// }
// var zhpData = new User(zhp);
//
// zhpData.save(function () {
//     console.log('-----更新完成----');
//     //console.log(zhpData);
//     // db.hgetall('user:8',function(value) {
//     //      console.log(value)
//     // })
//
// });

module.exports = User;
