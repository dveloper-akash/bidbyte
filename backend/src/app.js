import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import auctionRoutes from './routes/auction.routes.js'
import bidRoutes from './routes/bid.routes.js'
dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());

app.use("/api/auctions",auctionRoutes);
app.use("/api/bids",bidRoutes);

app.get('/',(req,res)=>{
    res.send('BidByte Backend is running');
})


const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})