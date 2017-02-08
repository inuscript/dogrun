module.exports = ( env ) => {
  const { moduleType } = env
  const tsLoaderOption = {
    compileOptions: {
      logLevel: "debug",
      logInfoToStdOut: true,
      module: moduleType
    }
  }
  console.log(tsLoaderOption)

  return {
    entry: './src/index.ts',
    output: {
      path: `output/${moduleType}`,
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        { test: /\.jpg$/, use: 'url-loader' },
        { test: /\.ts$/, use: [{
          loader: 'ts-loader',
          options: tsLoaderOption
        }]},
      ]
    }
  }
}