/* eslint-disable @typescript-eslint/no-var-requires */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: path.resolve(__dirname, "../..", "src", "index.tsx"),
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "../..", "dist"),
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(j|t)sx?$/,
        include: [/src/, /node_modules\/debug/],
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // only enable hot in development
              hmr: process.env.NODE_ENV === "development",
              // if hmr does not work, this is a forceful method.
              reloadAll: true,
            },
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
              localsConvention: "camelCaseOnly",
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Application",
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [{ from: "public" }],
    }),
    new WebpackShellPluginNext({
      onBuildStart: {
        scripts: ["npm run intl:generate-json"],
        blocking: true,
        parallel: false,
      },
    }),
    new Dotenv({
      path: process.env.DOTENV || "./.env",
    }),
  ],
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json"],
    alias: {
      src: path.resolve(__dirname, "../../src/"),
    },
  },
};
