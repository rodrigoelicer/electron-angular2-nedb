'use strict'

const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const helpers = require('./helpers')

module.exports = webpackMerge(commonConfig, {
  entry: {
    main: './src/main/index.ts'
  },

  resolve: {
    root: [helpers.root('src', 'main')]
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts'
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/package.json' }
    ])
  ],

  node: {
    __dirname: false,
    __filename: false
  },

  target: 'electron-main'
})
