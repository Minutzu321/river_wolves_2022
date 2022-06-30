const ws = require('ws')

const server = new ws.Server({
  port: 8192
})

console.log("Server pornit..")

const sockets = []

server.on('connection', function (socket) {
  sockets.push(socket)
  socket.on('message', onMessage)
  socket.on('close', function () {
    sockets.splice(sockets.indexOf(socket), 1)
  })

  function onMessage (message) {
    console.log(new Buffer.from(message).toString());
    sockets
      .filter(s => s !== socket)
      .forEach(socket => socket.send(message))
  }
})