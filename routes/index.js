const app = require('express');
const router = app.Router();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const room = io.of('/test');

http.listen(9000, function () {
  console.log("Listening on *:9000");
})

room.on('connection', (clientSocket) => {
  console.log('*** test connected ***');
  console.log(clientSocket.id)
  //echo 
  //user = 0, other = 1 
  clientSocket.on('test', (msg) => {
    console.log(msg)
    room.emit('test', { 'type': 1, 'message': msg })
  })
  clientSocket.on('disconnect', function () {
    clientSocket.disconnect();
    console.log('test disconnected');
  })

  clientSocket.on('sise', (msg) => {
    console.log(msg)
    clientSocket.emit('test', { 'res': 'msg response!' })
  })
})




module.exports = router;

