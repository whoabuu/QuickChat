import express from "express";
import http from "http";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";
import { log } from "console";

//Create express app and http server

const app = express();
const server = http.createServer(app);

//Initialize sockeet.io server
export const io = new Server(server,{
    cors:{
        origin:"*"
    }
});

//store online users
export const userSocketMap = {}; //{userId: socketId}

//Socket.io connection handler
io.on("connection", (socket)=>{
    const userId = socket.handshake.query.userId;
    console.log("User connected", userId);

    if(userId){
        userSocketMap[userId] = socket.id
    }
    
    //emit online users to all clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", ()=>{
        console.log("User disconnected", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

//Middleware
app.use(cors());
app.use(express.json({limit:"4mb"}));


//Routes
app.use("/api/status", (req,res) =>{res.send("Server is live!")});
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);


//Connect to mongoDB
await connectDB();

const PORT = process.env.PORT || 3000; 
server.listen(PORT, ()=>{
    console.log(`Server connected at ${PORT}`);
})