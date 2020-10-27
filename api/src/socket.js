const express = require ('express');
const http = require ('http');
const app = express();
const servidor = http.createServer(app);

const socketio = require('socket.io')
const io = socketio(servidor);

io.on('connection',socket => {
    socket.on('conectado',()=> {
        console.log('usuario conectado')
    });
    socket.on('mensaje',(data) => {
        socket.broadcast.emit('mensajes',data)
    });
    
    socket.on('sendChat',(chat)=>{
        io.emit('notification',chat)
    })
})

servidor.listen(3002, () => {
    console.log('%s listening at 3002'); // eslint-disable-line no-console
  });

module.exports = servidor;