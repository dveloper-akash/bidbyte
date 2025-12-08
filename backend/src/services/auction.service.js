import prisma from "../prisma.js";

export const createAuctionService= async (data)=>{
    const { title, description, imageUrl, startPrice, startTime, endTime, sellerId } =data;

    if (!title || !description || !imageUrl || !startPrice || !startTime || !endTime || !sellerId) 
        throw new Error("Missing required fields");
    
    const auction=await prisma.auctionItem.create({
        data:{
            title,
            description,
            imageUrl,
            startPrice,
            currentPrice:startPrice,
            startTime:new Date(startTime),
            endTime:new Date(endTime),
            sellerId,
            status:"UPCOMING"
        }
    })
    return auction;
}

export const getActiveAuctionsService=async ()=>{
    return prisma.auctionItem.findMany({
        where:{
            status:"ACTIVE"
        },
        orderBy:{
            endTime:"asc"
        }
    })
}
export const getUpcomingAuctionsService=async ()=>{
    return prisma.auctionItem.findMany({
        where:{
            status:"UPCOMING"
        },
        orderBy:{
            startTime:"asc"
        }
    })
}
export const getClosedAuctionsService=async ()=>{
    return prisma.auctionItem.findMany({
        where:{
            status:"CLOSED"
        },
        orderBy:{
            endTime:"desc"
        }
    })
}
export const getAuctionByIdService=async(id)=>{
    return prisma.auctionItem.findUnique({
        where:{
            id
        },
        include:{
            bids:{
                orderBy:{createdAt:"desc"},
                include:{
                    user:true
                }
            },
            seller:true
        }
    })
}