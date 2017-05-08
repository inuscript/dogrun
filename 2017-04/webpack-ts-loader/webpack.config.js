module.exports = ( env ) => {
  const { moduleType } = env
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
          options: {
            compilerOptions: {
              module: moduleType
            }
          }
        }]},
      ]
    }
  }
}