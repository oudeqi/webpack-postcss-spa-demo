const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let NODE_ENV = require('../config').NODE_ENV;
let PUBLIC_PATH = require('../config').PUBLIC_PATH;
let SERVICE_URL = require('../config').SERVICE_URL;

module.exports = {
	entry: {
		main: './app/index.js',
        vendor: ['jquery', 'swiper', 'swiper/dist/css/swiper.css']
	},
	output: {
		path: path.join(__dirname, '..', 'dist'),
        filename: 'assets/scripts/[name].[chunkhash:8].js',
        publicPath: PUBLIC_PATH,
        pathinfo: NODE_ENV === 'development'
	},
	module: {
		rules: [
            {
                test: /(\.jsx|\.js)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    publicPath: PUBLIC_PATH,
                    use: [{
                        loader: "css-loader",
                        options: {
                            modules: false
                        }
                    }, {
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: './postcss.config.js',
                                ctx: {
                                    autoprefixer: {browsers: ['> 1%']}
                                }
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
                    publicPath: PUBLIC_PATH,
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
                            interpolate: true,//为 ES6 模板字符串启用插值语法
                            minimize: false,
                            removeComments: false,
                            collapseWhitespace: false
                        }
                    }
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/fonts/[name].[hash:8].[ext]',
                    publicPath: PUBLIC_PATH,
                }
            }
        ]
    },
	plugins: [
		new CleanWebpackPlugin(['dist'], {
			root: path.join(__dirname, '..')
		}),
		new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV),
                'PUBLIC_PATH': JSON.stringify(PUBLIC_PATH),
                'SERVICE_URL': JSON.stringify(SERVICE_URL)
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor'],
            minChunks: Infinity,
            filename: 'assets/scripts/[name].[chunkhash:8].js',
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),
        new ExtractTextPlugin({
            filename: 'assets/styles/[name].[contenthash:8].css',
            allChunks: false
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'html-withimg-loader!app/index.html',
            chunks: ['manifest', 'vendor', 'main'],
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        })
	]
}