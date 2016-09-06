/**
 * Created by zhangpeng on 2016/9/6.
 */
'use strict'

var Promise = require('bluebird')
var request = Promise.promisify(require('request'))

var api = {
    accessToken:'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential'   //&appid=APPID&secret=APPSECRET是动态的所以这里省略
}
function Wechat(opts) {         //新增getAccessToken、saveAccessToken、updateAccessToken、isValidAccessToken 这四个方法
    var that = this;
    this.appID = opts.appID;
    this.appSecret = opts.appSecret;
    this.getAccessToken = opts.getAccessToken;  //获取access_token的方法
    this.saveAccessToken = opts.saveAccessToken;  //获取access_token的方法

    this.getAccessToken()    //先获取access_token → 将data数据json化 → 判断是否可用（包括判断是否过期，过期的话进行更新） → that保存最新access_token
        .then(function(data){
            try{
                data = JSON.parse();   //得到的access_token是一个字符串，需要json化
            }catch (e){
                return that.updateAccessToken();        //获取到的数据错误的时候，进行更新access_token
            }
            if(that.isValidAccessToken(data)){      //查一下是否合法--例如有效期是否过期
                Promise.resolve(data);
            }else {
                return that.updateAccessToken();
            }
        })
        .then(function (data) {
            that.access_token = data.access_token;
            that.expires_in = data.expires_in;      //过期时间

            that.saveAccessToken(data);    //将access_token存储起来
        })
}
//在原型链上增加updateAccessToken、isValidAccessToken这两个方法
Wechat.prototype.isValidAccessToken = function (data) {
    if (!data || !data.access_token || !data.expires_in) {        //假如出现这些情况
        return false;
    }
    //拿到数据中的票据，过期时间，还有当前时间
    var access_token = data.access_token;
    var expires_in = data.expires_in;
    var now = (new Date().getTime());

    if(now<expires_in){         //还没过期
        return true;
    }else{
        return false;
    }
}

//获取票据方法https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET

Wechat.prototype.updateAccessToken = function () {
    var appID = this.appID;
    var appSecret = this.appSecret;
    var url = api.accessToken + '&appid=' + appID + '&secret=' + appSecret;

    return new Promise(function (resolve,reject) {      //将通过get获取票据进行异步操作
        request({url:url,json:true})          //request是一个库，是一个发送get的请求
            .then(function (response) {
                var data = response[1];
                var now = (new Date().getTime());
                var expires_in = now+(data.expires_in-20)*1000;

                data.expires_in = expires_in;   //新的有效时间赋值给data对象
                resolve(data);   //把data继续往下传递
            })
    })
}
module.exports = Wechat;