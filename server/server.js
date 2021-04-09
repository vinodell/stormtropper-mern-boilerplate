import express from 'express'
import io from 'socket.io'
import regeneratorRuntime from 'regenerator-runtime'
import http from 'http'
import mongooseService from './services/mongoose'

import config from './config'

const server = express()
const ioServer = http.createServer(server)

const PORT = config.port // берем переменную из .env

server.use('/extra', express.static(`${__dirname}/public`)) // при огромных нагрузках в 100к пользвателей, именно статик жрет больше всего производительности в Node.js
// отсюда выгружаем статические данные, которые не меняются
// в зависимости от пользователя. Текст/картинки/стили
server.use(express.json({ limit: '50kb' })) // парсит данные, чтобы мы могли получать json-данные с помощью запросов ниже
// server.use((req, res, next) => {
//   console.log(`${new Date()}: ${req.url} ${req.method} from ${req.ip}`)
//   next()
// })

let msgHistory = [] // загулшка(вместо БД)

mongooseService.connect()

server.get('/', (req, res) => {
  res.send('express serv dude')
})

server.post('/api/v1/auth', (req, res) => {
  console.log(req.body)
  res.json({ status: 'ok' })
})

console.log('Socket_IO status is:', config.socketStatus)
if (config.socketStatus === 'true') {
  const socketIO = io(ioServer, {
    path: '/ws'
  })

  socketIO.on('connection', (socket) => {
    console.log(`user with id: ${socket.id} is finally connected`)
    socketIO.to(socket.id).emit('messageHistory', msgHistory) // обновление истории сообщений будет происходить только у пользователя, который подключился, а не у всех сразу

    socket.on('newMessage', (arg) => {
      msgHistory.push(arg) // сообщение после отправки добавляется в историю сообщений
      socketIO.emit('messageHistory', msgHistory) // обновленная история сообщений отправляется всем клиентам
    })

    socket.on('disconnect', () => {
      console.log(`the session of user: ${socket.id} is OVER`)
    })
  })
}

ioServer.listen(PORT, () => {
  console.log(`serving at http://localhost:${PORT}/`)
})
