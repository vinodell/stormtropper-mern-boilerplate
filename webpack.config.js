module.exports = process.env.NODE_ENV === 'development'
  ? require('./webpack.prod')
  : require('./webpack.dev')
