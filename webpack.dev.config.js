require('dotenv').config()

const { resolve } = require('path')
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
    // server: 'https',
    contentBase: resolve(__dirname, 'dist'),
    port: 8081, // client port
    host: 'localhost',
    client: {
      overlay: {
        warnings: false,
        errors: true
      }
    },
    historyApiFallback: true,
    proxy: {
      context: ['/api', '/ws'],
      target: `http://localhost:${PORT || 8080}`, // server port
      ws: SOCKETS_IO_STATUS
    }
  }
}

module.exports = merge(common, config)
