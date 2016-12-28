'use strict'

const helpers = require('./helpers')

module.exports = {

  /**
   * Default config for output
   */
  output: {
    path: helpers.root('dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  /**
   * Resolve module pathes and extensions
   */
  resolve: {
    extensions: ['', '.ts', '.js']
  },

  node: {
    global: 1,
    crypto: 'empty',
    module: 0,
    Buffer: 0,
    clearImmediate: 0,
    setImmediate: 0
  }
}
