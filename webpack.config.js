var webpack = require("webpack")
var path = require('path')
module.exports = {
    entry: './src/html/js/firstThree.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader' }
        ]
    }
}