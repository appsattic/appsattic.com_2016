// --------------------------------------------------------------------------------------------------------------------

"use strict"

// core
var http = require('http')

// local
var app = require('./lib/app.js')

// --------------------------------------------------------------------------------------------------------------------

var server = http.createServer()
server.on('request', app)

var port = process.env.PORT
server.listen(port, function() {
  console.log('Listening on port %s', port)
})

// --------------------------------------------------------------------------------------------------------------------
