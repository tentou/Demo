/**
 * mongoose模型
 * 连接后可以使用增删减和查找的功能
 * Created by zhangpeng on 2016/8/31.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/photo_app');  //连接数据库，用photo_app做数据库,会自动创建这个数据库

//连接事件
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('------数据库连接成功-----')
});

//模型设置
var schema = new mongoose.Schema({
    name:String,
    path:String
});
var Photo = mongoose.model('Photo',schema);   //这里的Photo决定着数据库photo_app内的集合名字，集合名字为photos小写加s
module.exports = Photo;
