"use strict";

const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        "bundle": './src',
        "bundle.min": './src'
    },
    output: {
        path: './src',
        filename: '../dist/[name].js',
        file: '../dist'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }, {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=application/font-woff&name=./../dist/fonts/[hash].[ext]"
        }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=application/font-woff&name=./../dist/fonts/[hash].[ext]"
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=application/octet-stream&name=./../dist/fonts/[hash].[ext]"
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file?name=./../dist/fonts/[hash].[ext]"
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=image/svg+xml&name=./../dist/fonts/[hash].[ext]"
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            compress: { warnings: false }
        }),
        new ExtractTextPlugin('../dist/style.min.css')
    ],
    resolve: {
        extensions: ['', '.js', '.jsx', '.css']
    }
}