const webpack = require('webpack')
module.exports = {
  entry: {
    index: "./src/index.js",
    index2: "./src/index2.js",
  },
  output: {
    filename: "[name].js",
    path: "dist/"
  },
  plugins:[
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: 2,
      // children: true,
      // minSize: 3,
      async: "object-assign",
      filename: "vendor.js"
    })
  ]
}