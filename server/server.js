const express = require('express')
const io = require('socket.io')
const http = require('http')

require('dotenv').config() // библиотека, позволяющая читать файл .env

const server = express()
const ioServer = http.createServer(server)
const socketIO = io(ioServer, {
  path: '/ws'
})

const port = process.env.PORT || 8080 // берем переменную из .env

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

socketIO.on('connection', (socket) => {
  console.log(`user with id ${socket.id} is finally connected`)
  socket.on('disconnect', () => {
    console.log(`the session of user ${socket.id} is OVER`)
  })
})

ioServer.listen(port, () => {
  console.log(`serving at http://localhost:${port}/`)
})
