module.exports = ( env ) => {
  const { moduleType } = env
  const tsLoaderOption = {
    logLevel: "debug",
    logInfoToStdOut: true,
    compilerOptions: {
      module: moduleType
    }
  }

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
        { test: /\.txt$/, use: 'url-loader' },
        { test: /\.ts$/, use: [{
          loader: 'ts-loader',
          options: tsLoaderOption
        }]},
      ]
    }
  }
}