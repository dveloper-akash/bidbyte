import prisma from "../prisma.js";
import { io } from "../app.js";
const MIN_BID_INCREMENT=5;

const ValidationError=(message)=>{
    const error=new Error(message);
    error.code="BID_VALIDATION";
    return error;
}

export const placeBidService= async({amount, userId, auctionId})=>{
    const now = new Date();
    return prisma.$transaction(async(tx)=>{
        const auction=await tx.auctionItem.findUnique({
            where:{
                id:auctionId
            },
            include:{
                seller:true
            }
        })
        if(!auction){
            throw ValidationError("Auction not found");
        }
        if(auction.status!=="ACTIVE"){
            throw ValidationError("Auction is not active");
        }
        if(auction.status==="UPCOMING"){
            throw ValidationError("Auction has not started yet");
        }
        if(auction.status==="CLOSED"){
            throw ValidationError("Auction has already ended");
        }
        if(auction.sellerId===userId){
            throw ValidationError("You cannot bid on your own auction")
        }
        const baselinePrice=auction.currentPrice;
        if(amount<baselinePrice + MIN_BID_INCREMENT){
            throw ValidationError(`Bid must be atleast ${MIN_BID_INCREMENT} higher than the current price (>= ₹${
                baselinePrice + MIN_BID_INCREMENT
            })`)
        }
        const updatedCount=await tx.auctionItem.updateMany({
            where:{
                id:auctionId,
                currentPrice:{lt:amount}
            },
            data:{
                currentPrice:amount
            }
        })
        if (updatedCount.count===0){
            throw ValidationError("You have been outbid by another user. Please refresh the price and try again.")
        }
        const bid =await tx.bid.create({
            data:{
                amount,
                userId,
                auctionId
            },
            include:{
                user:true
            }
        })
        io.emit("bid:placed",{
            auctionId,
            newPrice:amount,
            highestBid:bid,
            highestBidder:bid.user
        })
        const updatedAuction=await tx.auctionItem.findUnique({
            where:{
                id:auctionId
            },
            include:{
                seller:true
            }
        })
        return {bid,auction:updatedAuction};
    })
}