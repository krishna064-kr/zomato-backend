require("dotenv").config();
const http = require('http')
const app = require('./app')
const setver = http.createServer(app)
setver.listen(process.env.PORT,console.log('app is connected at http://localhost:' + process.env.PORT))