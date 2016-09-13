/**
 * Created by zhangpeng on 2016/4/8.
 */
var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH,'static/js');
var BUILD_PATH = path.resolve(ROOT_PATH,'dest');
var babelLoaderPath = path.resolve("../../node_modules");

module.exports = {
    entry:{
        //main:APP_PATH+"/main.jsx",
        router:APP_PATH+"/react-router.jsx"
    },
    output:{
        path:BUILD_PATH,
        filename:'bundle.js'
    },
    module:{
        loaders:[
            {
                test: /\.jsx?$/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    }
};
