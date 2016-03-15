var path = require("path")
module.exports = {
  entry: "./src/index.js",
  output: {
    path: "output/",
    filename: "bundle.js",
  },
  resolve: {
    root: [
      path.join(__dirname, "./src")
    ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}