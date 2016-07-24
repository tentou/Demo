var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    md5 = require("gulp-md5-plus"),
    uglify = require('gulp-uglify'),
    webpack = require('webpack'),
    del = require('del')

//webpack引入头配置
var path = require('path');
//引入公共文件插件
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);    //webpack.config.js所在位置就是根目录
//var APP_PATH = path.resolve(ROOT_PATH, 'dropload/client');    //这个是根目录下的dropload目录
//var BUILD_PATH = path.resolve(ROOT_PATH, 'dropload/dist/dropload');  //根目录下的dist/dropload文件夹下

//--------------------------------dropload项目-----------------------------

gulp.task("clean",function(){
    del('./dropload/dist/dropload/')
})
gulp.task("webpack",['clean'], function(callback) {
    // run webpack
    webpack({
        //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
        entry:{
            dropload:"./dropload/client/js/dropload.js",
            style:"./dropload/client/style/style.less"
        },
        //输出的文件名 合并以后的js会命名为bundle.js
        output: {
            path: "./dropload/dist/dropload",
            filename: '[name].js'
        },
        module: {
            //加载器配置
            loaders: [
                //.jsx文件解析，同时转换es6和react
                {test: /\.jsx?$/,loader: 'babel',query: {presets: ['es2015', 'react']}},
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
    }, function(err, stats) {
        //if(err) throw new gutil.PluginError("webpack", err);
        callback();
    });
});
gulp.task('dropload', ['webpack'],function () {
    gulp.src('./dropload/dist/dropload/*.js')
    .pipe(jshint())                                 //检验js
    .pipe(jshint.reporter()) // 输出检查结果
    .pipe(concat('bundle.js'))                //合并js
    .pipe(uglify())                         //压缩js
    .pipe(gulp.dest('./dropload/dist/dropload'))
    .pipe(md5(10,'./Dropload/client/pages/index.html'))    //md5戳(参数一定要放在一个括号内)  后边为index.html内包含的这个文件替换成这个带戳的文件
    .pipe(gulp.dest('./dropload/dist/dropload'))
 });


