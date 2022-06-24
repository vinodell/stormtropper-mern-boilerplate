require('dotenv').config()

const { merge } = require('webpack-merge')
const common = require('./webpack.common')

const { PORT, SOCKETS_IO_STATUS } = process.env

const config = {
  mode: 'development',
  optimization: {
    usedExports: true
  },
  devServer: {
    hot: true,
    open: true,
    port: 8081, // client port
    host: 'localhost',
    overlay: {
      errors: true,
      warnings: false,
      progress: true // prints compilation progress in percentage in the browser.
    },
    proxy: {
      context: ['/api', '/ws'],
      target: `http://localhost:${PORT || 8080}`, // server port
      ws: SOCKETS_IO_STATUS
    },
    historyApiFallback: true
  }
}

module.exports = merge(common, config)
