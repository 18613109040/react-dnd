const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ProgressBarPlugin = require('progress-bar-webpack-plugin')
const theme = require('../client/assets/style/theme');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const styleExtractor = new ExtractTextPlugin('css/styles.css',{allChunks:true});
const libExtractor = new ExtractTextPlugin('css/lib.css',{allChunks:true});
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
module.exports = {
    devtool: 'eval-source-map',
    context: path.resolve(__dirname, '..'),
    entry: {
        bundle: [
            './client',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist/client'),
        filename: '[name].js',
        chunkFilename: 'chunk.[name].js',
        publicPath: '/'
    },
    module: {
        loaders: [
        {
            test: /\.(js)$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react', 'stage-0','react-hmre'],
                plugins: [
                	['transform-runtime', { polyfill: false }],
                	['import', [{libraryName: "antd-mobile", style: true}]],
                ],
                cacheDirectory: true
            }
        }, 
        { test: /\.css$/i,
        	loader:styleExtractor.extract('style', 'css!') 
        },
        {
	        test  : /\.scss$/i,
	        loader: styleExtractor.extract('style', 'css!sass')
	      },{
        	test  : /\.less$/i,
         	loader: libExtractor.extract('style', `css!less?{"sourceMap":true,"modifyVars":${JSON.stringify(theme())}}`)
       }, 
        {
         	test  : /\.(jpe?g|png|gif|svg|woff|eot|ttf)$/,
         	loader: `url?limit=1000&name=img/[sha512:hash:base64:7].[ext]`
     	  },
        {
            test: /\.json$/,
            loader: 'json'
        }, 
        {
            test: /\.html$/,
            loader: 'html?minimize=false'
        }
      ]
    },
    extensions: ['', '.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json'],
    postcss: [
	    autoprefixer({
	      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
	    }),
	    pxtorem({ rootValue: 40, propWhiteList: [] })
	  ],
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
       	libExtractor,
       	styleExtractor,
        new webpack.HotModuleReplacementPlugin(),
				new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
        	'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        	 "__ISOMORPHIC__": true 
        }),
        new HtmlWebpackPlugin({
            filename: '../views/dev/index.html',
            template: './views/tpl/index.tpl.html',
           // inject: 'body' //单独webpack 
        }),
        new ProgressBarPlugin({summary: false}),
      
        
    ]
}
