
module.exports = {
  context: `${__dirname}`,
  entry: `./src/`,
  module: {
    loaders: [{
      test: /\.css/,
      // loader: 'css',
      // loader: 'style!css?importLoaders=1',
      loader: 'style!css?root=.',
      // loader: 'style!css',
    }, 
    {
      test: /\.jpg/,
      loader: 'url'
    }
  ],
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js'
  }
}