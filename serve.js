var express = require('express')
var serveStatic = require('serve-static')
var app = express()

app.use('/', serveStatic(__dirname))

app.listen(80, () => {
  console.log('ReveilleFront Server is Running on Port 80')
})
