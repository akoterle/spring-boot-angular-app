var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map', //'cheap-module-eval-source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: '/', 
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
      new ExtractTextPlugin('[name].css')
    ],

    devServer: {
        historyApiFallback: true,
        port: 9000,
        contentBase: helpers.root('dist'),
        proxy: {
            '/': {
                target: 'http://localhost:8080',
                secure: false
            }
        },
        stats: 'minimal',
    }

});
