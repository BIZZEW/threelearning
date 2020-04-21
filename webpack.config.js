var webpack = require("webpack")
var path = require('path')
module.exports = {
    entry: {
        firstThree: './src/firstThree.js',
        secondThree: './src/secondThree.js',
        thirdThree: './src/thirdThree.js',
        BufferGeometry: './src/BufferGeometry.js',
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