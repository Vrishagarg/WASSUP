const express = require('express') // import express library
const app = express() // creates a object of express function
const http = require('http').createServer(app) // import http library and creates a server on http

const PORT = process.env.PORT || 3000 // specify the PORT where the server is executed.(Default is 3000)

// creates a server that is running on port 3000
http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
    
})

app.use(express.static(__dirname + '/public')) //This uses static files in the project directory(for eg. css, javascript files are used using static method of express) 

// used to send HTML file to the server
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')   
})

// Socket.io library is imported and runs on http server
const io = require('socket.io')(http)

//when a client(socket) is connected to a server(io) the Connected.. is printed
io.on('connection', (socket) => {
    console.log('Connected...') 
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})