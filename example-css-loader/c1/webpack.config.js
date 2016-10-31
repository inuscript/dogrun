
module.exports = {
  context: `${__dirname}`,
  entry: `./src/`,
  module: {
    loaders: [{
      test: /\.css/,
      // loaders: ['style', 'css']
      loader: 'css',
      // query: {
      //   module: true
      // }
    }],
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js'
  }
}