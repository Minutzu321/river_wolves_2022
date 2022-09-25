const ws = require('ws')
const Prisma = require('prisma/prisma-client');

const {getUseri} = require('./useri.cjs');

const server = new ws.Server({
  port: 8192
});
console.log("Server pornit..")

const prisma = new Prisma.PrismaClient()
console.log("Conectat la baza de date..")

getUseri(prisma).then((rez)=>{
  console.log(rez);
});



const sockets = []

server.on('connection', function (socket, req) {
  sockets.push(socket)
  let path = req.url;
  console.log("Conexiune",path);
  if(true){
    socket.send("neautorizat_socket");
    socket.close();
    return;
  }
  socket.on('message', onMessage);
  socket.on('close', function () {
    console.log("Conexiune inchisa");
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
        console.log("se trimite", sockets.indexOf(so));
        so.send(mesaj);
      })
  }
})