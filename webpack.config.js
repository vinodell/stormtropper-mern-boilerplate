module.exports = process.env.NODE_ENV === 'development'
  ? require('./webpack.dev.config')
  : require('./webpack.prod.config')
