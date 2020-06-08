const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../..', 'src', 'index.js'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../..', 'dist'),
  },
  plugins: [new HtmlWebpackPlugin()]
};