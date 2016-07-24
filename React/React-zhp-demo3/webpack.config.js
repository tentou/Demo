var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
console.log(ROOT_PATH)
module.exports = {
	entry : './js/index.jsx',
	output : {filename:'./bundle.js'},
	module:{
		loaders:[
		{
			test: /\.js[x]?$/,
			exclude: /node_modules/,
			loader: 'babel-loader?presets[]=es2015&presets[]=react'
		}
		]
	}
}