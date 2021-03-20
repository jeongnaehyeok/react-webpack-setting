const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname);
const SRC_PATH = path.resolve(__dirname, 'src');
const BUILD_PATH = path.resolve(PROJECT_ROOT, 'build');

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
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };
};
