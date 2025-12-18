import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import auctionRoutes from './routes/auction.routes.js'
import bidRoutes from './routes/bid.routes.js'
import authRoutes from './routes/auth.routes.js'
dotenv.config();

const app=express();

app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

const server=http.createServer(app);
export const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true
    }
})
io.on("connection",(socket)=>{
    console.log("User Connected",socket.id);

    socket.on("auction:join",(auctionId)=>{
        socket.join(`auction_${auctionId}`);
        console.log(`User ${socket.id} joined room auction_${auctionId}`);
    })

    socket.on("auction:leave",(auctionId)=>{
        socket.leave(`auction_${auctionId}`);
        console.log(`User ${socket.id} left room auction_${auctionId}`);
    })

    socket.on("disconnect",()=>{
        console.log("User Disconnected",socket.id)
    })
})

app.use("/auth",authRoutes)
app.use("/api/auctions",auctionRoutes);
app.use("/api/bids",bidRoutes);

app.get('/',(req,res)=>{
    res.send('BidByte Backend is running');
})
import "./workers/auction.worker.js"

const PORT=process.env.PORT || 5000;

server.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})