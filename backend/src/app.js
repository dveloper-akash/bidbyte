import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import auctionRoutes from './routes/auction.routes.js';
import bidRoutes from './routes/bid.routes.js';
import authRoutes from './routes/auth.routes.js';
import { socketAuth } from './socket/socketAuth.js';
dotenv.config();

const app=express();

app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});


app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

const server=http.createServer(app);
export const io=new Server(server,{
    cors:{
        origin:process.env.CLIENT_URL,
        methods:["GET","POST"],
        credentials:true
    }
})
io.use(socketAuth);
io.on("connection",(socket)=>{

    const userId=socket.user?socket.user.id:"guest";

    console.log("User Connected",{
        socketId:socket.id,
        userId   
    });
    if(socket.user){
        socket.join(`user_${userId}`);
    }
    

    socket.on("auction:join",(auctionId)=>{
        socket.join(`auction_${auctionId}`);
        console.log(`User ${userId} joined room auction_${auctionId}`);
    })

    socket.on("auction:leave",(auctionId)=>{
        socket.leave(`auction_${auctionId}`);
        console.log(`User ${userId} left room auction_${auctionId}`);
    })

    socket.on("disconnect",()=>{
        console.log("User Disconnected",userId);
    })
})

app.use("/auth",authRoutes)
app.use("/api/auctions",auctionRoutes);
app.use("/api/bids",bidRoutes);

app.get('/',(req,res)=>{
    res.send('BidByte Backend is running');
})
app.get('/health',(req,res)=>{
    res.status(200).send("OK");
})
import "./workers/auction.worker.js"

const PORT=process.env.PORT || 5000;

server.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})