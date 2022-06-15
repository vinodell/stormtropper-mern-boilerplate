import mongoose from 'mongoose'
import config from '../config'

mongoose.connection.on('connected', () => {
  // eslint-disable-next-line
  console.log('db is connected')
})

mongoose.connection.on('error', (err) => {
  // eslint-disable-next-line
  console.log(`db is not working ${err}`)
  process.exit(1) // завершить текущий процесс, а '1' значит, что все очень плохо, есть ошибка
})

export default {
  connect: async (mongoUrl = config.mongoUrl) => {
    await mongoose.connect(mongoUrl, {})
    return mongoose.connection
  }
}
