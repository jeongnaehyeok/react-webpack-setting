const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PROJECT_ROOT = path.resolve(__dirname);
const SRC_PATH = path.resolve(__dirname, 'src');
const BUILD_PATH = path.resolve(PROJECT_ROOT, 'build');
const PUBLIC_INDEX = path.resolve(PROJECT_ROOT, 'public', 'index.html');

module.exports = webpackEnv => {
  const mode = webpackEnv.WEBPACK_SERVE ? 'development' : 'production';
  const isEnvDevelopment = mode === 'development';
  const isEnvProduction = mode === 'production';
  return {
    mode,
    entry: path.resolve(SRC_PATH, 'index.jsx'),
    output: {
      path: BUILD_PATH,
      filename: isEnvProduction
        ? 'js/[name].[contenthash:8].js'
        : 'js/bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.jsx?/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css/,
          exclude: /node_modules/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.jsx', '.js', '.json'],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: PUBLIC_INDEX }),
      new Dotenv(),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
    ],
  };
};
