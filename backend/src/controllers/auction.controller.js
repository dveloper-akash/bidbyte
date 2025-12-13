import { createAuctionService, getActiveAuctionsService, getAuctionByIdService, getClosedAuctionsService, getUpcomingAuctionsService } from "../services/auction.service.js";

export const createAuction = async (req,res)=>{
    try{
        const data=req.body;
        const userId=req.user.userId;
        const result=await createAuctionService(data,userId);
        return res.status(201).json(result);
    }
    catch(error){
        console.error("Create Auction Error:",error);
        return res.status(400).json({error:error.message})
    }
}

export const getActiveAuctions= async (req,res)=>{
    try{
        const result=await getActiveAuctionsService();
        return res.status(200).json(result);
    }
    catch(error){
        console.error("Get Active Auction Error:",error);
        return res.status(500).json({error:error.message})
    }
}
export const getUpcomingAuctions= async (req,res)=>{
    try{
        const result=await getUpcomingAuctionsService();
        return res.status(200).json(result);
    }
    catch(error){
        console.error("Get Upcoming Auction Error:",error);
        return res.status(500).json({error:error.message})
    }
}
export const getClosedAuctions= async (req,res)=>{
    try{
        const result=await getClosedAuctionsService();
        return res.status(200).json(result);
    }
    catch(error){
        console.error("Get Closed Auction Error:",error);
        return res.status(500).json({error:error.message});
    }
}
export const getAuctionById=async(req,res)=>{
    try{
        const result=await getAuctionByIdService(req.params.id);
        return res.status(200).json(result);
    }
    catch(error){
        console.log("Get Auction By Id Error:",error)
        return res.status(500).json({error:error.message})
    }
}

    
