const { ResolvePlugin } = require("webpack")

const { resolve } = require('path')

const config = {
  entry: './client/main.js',
  mode: 'development',
  output: {
    filename: 'js/[name]/bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
    //  publicPath пустая переменная
  },
  module: {
    rules: [
      {
        test: /\.[js|jsx]$/,
        loaders: ['babel_loader'],
        exclude: /node_modules/
        // описания правил работы с jsx для JavaScript, к которому применим babel
      }
    ]
  }
}

module.exports = config