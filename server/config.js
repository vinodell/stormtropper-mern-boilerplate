require('dotenv').config() // библиотека, позволяющая читать файл .env

const settings = {
 port: process.env.PORT,
 env: process.env.NODE_ENV,
 socketStatus: process.env.SOCKETS_IO_STATUS
}

export default settings