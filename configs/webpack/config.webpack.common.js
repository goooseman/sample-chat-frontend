const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../..', 'src', 'index.ts'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../..', 'dist'),
  },
  module: {
    rules: [
      { test: /\.tsx?$/, 
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin()]
};