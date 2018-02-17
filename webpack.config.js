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
    open: true,
    historyApiFallback: true // For browserRouter to work correctly with urls HistoryAPIfall needs to be true for the webpackdev server, you can use hash router locally to not have this. See https://webpack.js.org/configuration/dev-server/#devserver-historyapifallback
  }
};
module.exports = config;
