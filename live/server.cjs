const ws = require('ws')
const Prisma = require('prisma/prisma-client');

const {getUseri} = require('./useri.cjs');

const server = new ws.Server({
  port: 8192
});
console.log("Server pornit..")

const prisma = new Prisma.PrismaClient()
console.log("Conectat la baza de date..")

const sockets = []

server.on('connection', async function (socket, req) {
  sockets.push(socket)
  let path = req.url.substring(1);
  const user = await prisma.user.findFirst({
    where:{
      sauth: path,
    }
  })
  if(!user){
    socket.send("neautorizat_socket");
    socket.close();
    console.log("NEAUTORIZAT");
    return;
  }
  console.log(user.nume,"e conectat");
  socket.on('message', onMessage);
  socket.on('close', function () {
    sockets.splice(sockets.indexOf(socket), 1)
  })

  function onMessage (message) {
    let mesaj = new Buffer.from(message).toString();
    console.log(mesaj);
    if(mesaj==="ping"){
      socket.send("pong");
      return;
    }
    sockets.filter(s => s !== socket)
      .forEach(so => {
        so.send(mesaj);
      })
  }
})