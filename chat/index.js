const express = require('express');
const app = express();
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');

app.use(cors());
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin: "http://localhost:3000",
        methods:["GET","POST"]
    }
});

io.on('connection',(socket)=>{
    socket.on('send_msg',data=>{
        socket.to(data.roomNumber).emit('receive_message',data.log);
    });
    socket.on('leave_room',data=>{
        socket.leave(data);
    });
    socket.on('join_room',data=>{
        socket.join(data);
    });
})

io.on('disconnect',(socket)=>{
})

server.listen(5000,()=>{
    console.log('server is running on port 5000')
})