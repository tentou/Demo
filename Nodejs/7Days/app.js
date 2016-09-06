
/**
 * 微信开发主程序
 * Created by tentou on 2016/9/5.
 */
'use strict'

var Koa = require('koa');
var path = require('path');
var util = require('./libs/util');

var wechat = require('./g');
var wechat_file = path.join(__dirname,'./config/wechat.txt')
var config = {
    wechat:{
        appID:'wx29caa01db5592485',
        appSecret:'ca79423ad148c52b5522d284f3924a72',
        token:'tentouceshi',
        getAccessToken:function () {
            return util.readFileAsync(wechat_file)
        },
        saveAccessToken:function (data) {
            data = JSON.stringify(data);        //将data转为字符串存入
            return util.writeFileAsync(wechat_file,data)

        }

    }
};

var app = new Koa();



app.use(wechat(config.wechat));

app.listen(3000)
console.log('Listening:3000')