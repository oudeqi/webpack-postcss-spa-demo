const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const resolve = function(dir) {
    return path.join(__dirname, '..', dir)
};

module.exports = {
	// devtool: 'eval-source-map',
	devtool: 'none',
	entry: {
		main: './app/index.js',
		vendor: ['jquery', 'swiper', 'swiper/dist/css/swiper.css']
	},
	output: {
		path: path.join(__dirname, "build"),
		filename: 'assets/scripts/[name].[chunkhash:8].js',
		publicPath: '/'
	},
	// resolve: {
 //        // extensions: ['.js', '.css'],
 //        alias: {
 //            '@': resolve('app')
 //        }
 //    },
 	// externals: {
  //       jquery: 'jQuery'//jquery不会被打包，需要手动通过外部引用的方法
  //   },
	devServer: {
        contentBase: path.join(__dirname, "build"),
        headers: {
            "X-Custom-Foo": "bar"
        },
        historyApiFallback: true,
        compress: true,//对资源启用 gzip 压缩
        publicPath: '/',
        inline: true,
        host: "192.168.0.12",
        port: 4000,
	},
	module: {
		rules: [
			{
				test: /(\.jsx|\.js)$/,
				use: {
					loader: 'babel-loader'
				},
				exclude: /(node_modules|bower_components)/
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    publicPath: '/',
                    use: [{
                        loader: "css-loader",
                        options: {
                            modules: false //css模块功能
                        }
                    }, {
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: './postcss.config.js'
                            }
                        }
                    }],
                })
			},
		    {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'url-loader',
                options: {
                    name: 'assets/images/[name].[hash:8].[ext]',
                    // outputPath: '/assets/',
                    publicPath: '/',
                    limit: 1024 * 3
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-withimg-loader",
                        options: {
                            // exclude: /image/,//排除image目录
                            min: false,//默认会去除html中的换行符，配置min=false可不去除
                            deep: false,//将关闭include语法嵌套子页面的功能
                        }
                    },
                    {
                        loader: "html-loader",
                        options: {
                            attrs: ['img:data-src'],
                            interpolate: true,
                        }
                    }
                ]
            },
		    {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader',
                options: {
                	name: 'assets/fonts/[name].[hash:8].[ext]',
                    publicPath: '/',
                }
            }
		]
	},
	plugins: [
	    new CleanWebpackPlugin(['build/']),
	    new webpack.optimize.OccurrenceOrderPlugin(),
	    new webpack.DefinePlugin({
	        'process.env.NODE_ENV': '"production"',
	    }),
	    new webpack.ProvidePlugin({
	        $: "jquery",
	        jQuery: "jquery"
	    }),
	    new webpack.BannerPlugin('版权所有，翻版必究'),
	    new webpack.optimize.UglifyJsPlugin({
	     compress: {
	            warnings: false,
	            drop_console: false,
	        }
	    }),
	    new webpack.optimize.CommonsChunkPlugin({
	        name: ['vendor', 'manifest'],
	        minChunks: Infinity,
	        filename: 'assets/scripts/[name].[chunkhash:8].js',
	    }),
	    new ExtractTextPlugin({
	        filename: 'assets/styles/[name].[contenthash:8].css',
	        allChunks: false
	    }),
	    new HtmlWebpackPlugin({
	    	filename: 'index.html',
	    	template: 'html-withimg-loader!app/index.html',
	    	chunks: ['manifest', 'vendor', 'main']// 
	    })
	]
}
// TODO 如何清除css里面的注释
// TODO postcss 如何生成source-map