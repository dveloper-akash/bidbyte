import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import auctionRoutes from './routes/auction.routes.js'
import bidRoutes from './routes/bid.routes.js'
dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());

const server=http.createServer(app);
export const io=new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})
io.on("connection",(socket)=>{
    console.log("User Connected",socket.id);

    socket.on("disconnect",()=>{
        console.log("User Disconnected",socket.id)
    })
})

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