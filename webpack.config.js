const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    v15: './src/v15/index.js',
    v16: './src/v16/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
}
