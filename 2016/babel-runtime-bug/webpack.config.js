const webpack = require('webpack')

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: '[name].js',
    path: "output",
  },
  module: {
    loaders: [ {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
    } ],
  }
}