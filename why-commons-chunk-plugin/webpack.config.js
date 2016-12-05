const webpack = require('webpack')
module.exports = {
  entry: {
    index: "./src/index.js",
    vendor: ["./src/lib/libA.js"]
  },
  output: {
    filename: "bundle.js",
    path: "dist/"
  },
  plugins:[
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      // minChunks: module => {
      //   // console.log(/node_modules/.test(module.resource))
      //   return /node_modules/.test(module.resource)
      // },
      filename: "vendor.js"
    })
  ]
}