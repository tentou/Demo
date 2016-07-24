var path = require('path');
//引入公共文件插件
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);    //webpack.config.js所在位置就是根目录
var APP_PATH = path.resolve(ROOT_PATH, 'client');    //这个是根目录下的dropload目录
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist/dropload');  //根目录下的dist/dropload文件夹下

module.exports = {
    //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
    entry:{
        dropload:APP_PATH+"/js/dropload.js",
        style:APP_PATH+"/style/style.less"
    },
    //输出的文件名 合并以后的js会命名为bundle.js
    output: {
        path: BUILD_PATH,
        filename: '[name].js'
    },
    module: {
        //加载器配置
        loaders: [
            //.jsx文件解析，同时转换es6和react
            {test: /\.js[x]?$/,exclude: /node_modules/,loader: 'babel-loader?presets[]=es2015&presets[]=react'},
            //.less文件解析
            { test: /\.less$/,loader:'style!css!less'},
            //.css文件解析
            {test:/\.css$/,loader:'style-loader!css-loader'}
        ]
    }
    /*plugins: [
        //new CommonsChunkPlugin("admin-commons.js", ["ap1", "ap2"]),
        //new CommonsChunkPlugin("commons.js", ["p1", "p2", "admin-commons.js"])
    ]*/
};