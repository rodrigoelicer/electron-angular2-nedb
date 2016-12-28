'use strict'

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const helpers = require('./helpers')

const CopyWebpackPlugin = require('copy-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const rendererConfig = {
  entry: {
    'polyfills': './src/renderer/polyfills.browser.ts',
    'vendor': './src/renderer/vendor.browser.ts',
    'app': './src/renderer/app.browser.ts'
  },

  resolve: {
    root: [
      helpers.root('src', 'renderer')
    ]
  },

  plugins: [
    new AssetsPlugin({
      path: helpers.root('dist'),
      filename: 'webpack-assets.json',
      prettyPrint: true
    }),

    new CopyWebpackPlugin([
        { from: 'src/renderer/assets', to: 'assets' }
    ]),

    new webpack.optimize.OccurenceOrderPlugin(true),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills'],
      minChunks: Infinity
    }),

    new HtmlWebpackPlugin({
      template: 'src/renderer/index.html',
      inject: 'body',
      chunksSortMode: 'none'
    })
  ],

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['ts', 'angular2-template-loader']
      },
      {
        test: /\.css$/,
        loaders: ['to-string-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: 'file-loader'
      }
    ]
  },

  target: 'electron-renderer'
}

module.exports = webpackMerge(commonConfig, rendererConfig)
