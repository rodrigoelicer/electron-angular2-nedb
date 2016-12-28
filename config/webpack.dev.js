'use strict'

const webpackMerge = require('webpack-merge')

const electronMainConf = require('./webpack.electron.main.js')
const electronRendererConf = require('./webpack.electron.renderer.js')

const devConfig = {
  devtool: 'cheap-module-source-map',
  cache: true,
  debug: true,

  devServer: {
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
}

module.exports = [
  webpackMerge(electronMainConf, devConfig),
  webpackMerge(electronRendererConf, devConfig)
]
