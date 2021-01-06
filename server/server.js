const express = require('express')
require('dotenv').config() // библиотека, позволяющая читать файл .env

const server = express()
const port = process.env.PORT || 8080 // берем переменную из .env

server.use('/extra', express.static(`${__dirname}/public`))
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

server.get('/name/:img', (req, res) => {
  res.send(`Hey, ${req.params.img}`)
})

server.post('/users', (req, res) => {
  const user = {
    name: req.body.name,
    age: req.body.age,
    date: new Date()
  }
  res.json(user)
})

server.listen(port, () => {
  console.log(`serving at http://localhost:${port}/`)
})
