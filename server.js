const express = require("express")

const app = express();
const PORT = process.env.PORT || 4000;

const connectedUser = new Set();

const server = app.listen(PORT,()=>{
    console.log('Server Started on', PORT)
});

const io = require( 'socket.io')(server)

io.on('connection',(socket)=>{
    console.log("connected Succesfully", socket.id)
    connectedUser.add(socket.id)
    io.emit('connected-user',connectedUser.size)
    
    socket.on("disconnect",()=>{
        console.log("disconnected user:", socket.id)
        connectedUser.delete(socket.id)
        io.emit('connected-user',connectedUser.size)
    });

    socket.on('message',(data)=>{
        console.log(data);
        socket.broadcast.emit('message-receive', data);
  
    })
})