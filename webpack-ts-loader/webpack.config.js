module.exports = {
  entry: './src/index.ts',
  output: {
    publicPath: "output",
    filename: 'output/bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      { test: /\.jpg$/, use: 'url-loader' },
      { test: /\.ts$/, use: 'ts-loader' },
    ]
  }
}