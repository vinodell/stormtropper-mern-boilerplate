import express from 'express'
import io from 'socket.io'
import http from 'http'

import config from './config'

const server = express()
const ioServer = http.createServer(server)

const PORT = config.port // берем переменную из .env

server.use('/extra', express.static(`${__dirname}/public`)) // при огромных нагрузках в 100к пользвателей, именно статик жрет больше всего производительности Node.js
// отсюда выгружаем статические данные, которые не меняются
// в зависимости от пользователя. Текст/картинки/стили
server.use(express.json({ limit: '50kb' }))
server.use((req, res, next) => {
  console.log(`${new Date()}: ${req.url} ${req.method} from ${req.ip}`)
  next()
})

server.get('/', (req, res) => {
  res.send('express serv dude')
})

if (config.socketStatus) {
  const socketIO = io(ioServer, {
    path: '/ws'
  })

  socketIO.on('connection', (socket) => {
    console.log(`user with id: ${socket.id} is finally connected`)
    socket.on('disconnect', () => {
      console.log(`the session of user: ${socket.id} is OVER`)
    })
  })
}

if (config.mongoStatus) {
  console.log('mongodb status is: turn on')
  const url = 'mongodb://127.0.0.1/'
}

ioServer.listen(PORT, () => {
  console.log(`serving at http://localhost:${PORT}/`)
})
