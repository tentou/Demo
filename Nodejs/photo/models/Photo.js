/**
 * mongoose模型
 * 连接后可以使用增删减和查找的功能
 * Created by zhangpeng on 2016/8/31.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/photo_app');  //连接数据库，用photo_app做数据库
var schema = new mongoose.Schema({
    name:String,
    path:String
});
mongoose.model('Photo',schema);
var Photo = mongoose.model('Photo');
module.exports = Photo;
