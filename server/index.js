const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoute = require('./Routes/userRoute');
const messageRoutes = require('./Routes/messagesRoutes')
const socket = require('socket.io')

const app = express();

// the middlewares 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

// Routes
app.use('/api/auth', userRoute)
app.use("/api/messages", messageRoutes );

// the connection with mongodb 
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
})
.then(()=>{
    console.log('Database connecting successful')
})
.catch((err)=>{
    console.log(err.message);
})

const server = app.listen(process.env.PORT,()=>{
    console.log('Your Server is runing :)')
})
const io = socket(server,{
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
      },
})
    global.onlineUsers = new Map();
    io.on("connection", (socket) => {
        global.chatSocket = socket;
            socket.on("add-user", (userId) => {
            onlineUsers.set(userId, socket.id);
            })
            socket.on("send-msg", (data) => {
                const sendUserSocket = onlineUsers.get(data.to);
                if (sendUserSocket) {
                  socket.to(sendUserSocket).emit("msg-recieve", data.message);
                }
            });
        })
        
        