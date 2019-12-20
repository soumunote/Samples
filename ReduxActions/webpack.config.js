const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'output.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    host: "0.0.0.0",
    port: 8080,
    open: true,
    overlay: {
      warning: true,
      errors: true
    }
  },
  devtool: 'inline-source-map'
}
