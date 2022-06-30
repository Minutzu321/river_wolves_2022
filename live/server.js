const ws = require('ws')

const server = new ws.Server({
  port: 8192
})

console.log("Server pornit..")

const sockets = []

server.on('connection', function (socket) {
  sockets.push(socket)
  console.log("Conectat!");
  socket.on('message', onMessage)
  socket.on('close', function () {
    console.log(socket);
    sockets.splice(sockets.indexOf(socket), 1)
  })

  function onMessage (message) {
    console.log(message);
    sockets
      .filter(s => s !== socket)
      .forEach(socket => socket.send(message))
  }

  if (sockets.length === 2) {
    sockets.forEach(socket => socket.send('ready'))
  }
})