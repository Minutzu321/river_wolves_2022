const ws = require('ws')
const Prisma = require('prisma/prisma-client');

const server = new ws.Server({
  port: 8192
});
console.log("Server pornit..")

const prisma = new Prisma.PrismaClient()
console.log("Conectat la baza de date..")



const sockets = []

server.on('connection', function (socket, req) {
  sockets.push(socket)
  let path = req.url;
  console.log("Conexiune",path);
  socket.on('message', onMessage);
  socket.on('close', function () {

    sockets.splice(sockets.indexOf(socket), 1)
  })

  function onMessage (message) {
    console.log(new Buffer.from(message).toString());
    sockets
       .filter(s => s !== socket)
      .forEach(sockets => socket.send(message))
  }
})