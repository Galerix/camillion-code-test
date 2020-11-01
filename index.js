// ( function() { // no need for this
'use strict'

//const enableDestroy = require( 'server-destroy' )
const app = require('express')()
const http = require('http')

let val = 0

app.use('/inc', (req, res) => {
    val++
    res.send(val.toString())
})

const server = http.createServer(app)

server.listen(3000)

// enableDestroy(server);    
module.exports = server

// } )()