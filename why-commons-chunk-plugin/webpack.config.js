const webpack = require('webpack')
module.exports = {
  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: "bundle.js",
    path: "dist/"
  },
  plugins:[
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: module => {
        console.log(module.resource)
        return /node_modules/.test(module.resource)
      },
      filename: "vendor.js"
    })
  ]
}