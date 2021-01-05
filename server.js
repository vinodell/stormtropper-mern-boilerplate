const express = require('express')
const bodyParser = require('body-parser')
const server = express()

const port = 8080

server.use((req, res, next) => {
  console.log(`${new Date()}: ${req.url} ${req.method} from ${req.ip}`)
  next()
})

server.use(bodyParser.json({ limit: '5mb'}))

server.get('/', (req, res) => {
  res.send('express serv dude')
})

server.get('/name/:img', (req, res) => {
  res.send(`Hey, ${req.params.img}`)
})

server.post('/users', (req,res) => {
  const user = {
    name: req.body.name,
    age: req.body.age,
    date: new Date()
  }
  res.json(user)
})

server.listen(port, () => {
  console.log(`Serving at http://localhost:${port}/`);
})
