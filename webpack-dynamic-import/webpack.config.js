const webpack = require("webpack")
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: function (module) {
    //       // this assumes your vendor imports exist in the node_modules directory
    //       return module.context && module.context.indexOf('node_modules') !== -1;
    //   }
    // }),
    new webpack.optimize.CommonsChunkPlugin({ 
      name: 'manifest',
      minChunks: Infinity
    })
  ]
};