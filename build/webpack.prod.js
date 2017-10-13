const merge = require('webpack-merge');
const webpack = require('webpack');
const base = require('./webpack.base.js');

module.exports = merge(base, {
	plugins: [
		new webpack.BannerPlugin('版权所有，翻版必究'),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.UglifyJsPlugin({
            // sourceMap: true,
            compress: {
                // warnings: true,
                drop_console: false,
            }
        })
	]
});