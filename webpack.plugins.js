const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const Webpack = require('webpack')
const dotenv = require('dotenv')

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new Webpack.ExternalsPlugin('commonjs', ['electron']),
  new Webpack.EnvironmentPlugin({
    ...dotenv.config().parsed,
  }),
]
