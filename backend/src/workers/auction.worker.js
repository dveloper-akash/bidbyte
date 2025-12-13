import {Worker} from 'bullmq';
import { redis } from '../config/redis.js';
import { io } from '../app.js';
import prisma from '../prisma.js';

export const auctionWorker = new Worker(
    "auctionQueue",
    async (job)=>{
        const {auctionId}=job.data;
        const auction=await prisma.auctionItem.findUnique({
            where:{
                id:auctionId
            }
        })
        if (!auction) return;
        if (job.name==="startAuction"){
            await prisma.auctionItem.update({
                where:{ id:auctionId },
                data:{ status:"ACTIVE" }
            })
            io.to(`auction_${auctionId}`).emit("auction:started",{ auctionId });
            console.log(`Auction started:${auction.title}`);
        }

        if(job.name==="endAuction"){
            const highestBid=await prisma.bid.findFirst({
                where:{auctionId},
                orderBy:{amount:"desc"},
                include:{
                    user:true
                }
            })
            await prisma.auctionItem.update({
                where:{id:auctionId},
                data:{status:"CLOSED"}
            })
            io.to(`auction_${auctionId}`).emit("auction:ended",{
                auctionId,
                winner:highestBid
            })
            console.log(`Auction ended:${auction.title}`);
            console.log("Auction winner:",highestBid);
        }
    },
    {connection:redis}
)