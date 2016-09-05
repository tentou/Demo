/**
 * Created by 少冬 on 2016/7/21.
 */
'use strict'
var path =require('path')
var util=require('./libs/util')
var wechat_file = path.join(__dirname,'./config/wechat.txt')
var config ={
    wechat:{
        appID:'wxd0dc38d339a06104',
        appSecret:'d266e1c094bdacf0f83eca46629602c7',
        token:'yushaodong',
        getAccessToken:function () {
            return util.readFileAsync(wechat_file)
        },
        saveAccessToken:function (data) {
            data = JSON.stringify(data)
            return util.writeFileAsync(wechat_file,data)
        }
    }
}

module.exports=config