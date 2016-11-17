
module.exports = {
  context: `${__dirname}`,
  entry: `./src/`,
  module: {
    loaders: [{
      test: /\.css/,
      loader: 'css?-url&modules',
      // loader: 'css?modules',
      // loader: 'css?ismportLoaders=1',
      // loader: 'css?root=.',
      // loader: 'style!css?importLoaders=1',
      // loader: 'css',
      // loader: 'raw',
      // loader: 'style!css?root=.',
      // loader: 'style!css',
    }, 
    // {
    //   test: /\.jpg/,
    //   loader: 'url'
    // }
  ],
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js'
  }
}