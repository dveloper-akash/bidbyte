import { placeBidService } from "../services/bid.service.js";

export const placeBid= async(req,res)=>{
    try{
        const { amount, userId, auctionId}=req.body;
        if(!amount || !userId || !auctionId){
            return res.status(400).json({error:"Required fields are missing"});
        }
        const numericAmount=Number(amount);
        if(Number.isNaN(numericAmount) || numericAmount<=0){
            return res.status(400).json({error:"Amount must be a positive number"});
        }
        const { bid, auction }=await placeBidService({ amount:numericAmount, userId, auctionId});
        return res.status(201).json({
            message: "Bid placed successfully",
            bid,
            auction
        })
    }
    catch(error){
        console.error("Place Bid Error:",error);
        if (error.code==="BID_VALIDATION")
            return res.status(400).json({error:error.message});
        return res.status(500).json({error:error.message});
    }
}