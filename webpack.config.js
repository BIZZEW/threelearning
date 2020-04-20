var webpack = require("webpack")
var path = require('path')
module.exports = {
    entry: {
        firstThree: './src/firstThree.js',
        secondThree: './src/secondThree.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader' }
        ]
    }
}