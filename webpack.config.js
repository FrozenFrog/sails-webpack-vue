const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
  entry: {
    entry: ['./assets/src/index.js','webpack-hot-middleware/client?reload=true']
  },
  output: {
    path: path.join(__dirname, '.tmp/public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['vue-style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: 'assets/src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};