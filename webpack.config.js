const webpack = require('webpack');
const path = require('path');

const config = {
    entry: './client/src/index.js',
    output: {
        path: path.resolve(__dirname, './client/dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    devServer: {
      contentBase: path.join(__dirname, "./client/dist"),
      port: 8080,
      open: true
    }
};
module.exports = config;
