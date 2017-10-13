const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base.js');

const PUBLIC_PATH = require('../config').PUBLIC_PATH;

module.exports = merge(base, {
	devtool: 'eval-source-map',
	devServer: {
        host: "192.168.0.12",
        contentBase: [path.join(__dirname, 'dist')],
        headers: {
            "X-Custom-Foo": "bar"
        },
        historyApiFallback: true,
        compress: true,//对资源启用 gzip 压缩
        publicPath: PUBLIC_PATH,
        inline: true,
        port: 4000,
        clientLogLevel: "none",//none, error, warning 或者 info（默认值）
        noInfo: false,
        open: true,
        // openPage: '/different/page'
    }
});