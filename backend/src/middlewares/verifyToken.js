import jwt from 'jsonwebtoken';

export const verifyToken=(req,res,next)=>{

    const token=req.cookies.token;
    if(!token){
        console.error("token not found");
        res.status(401).json({ error: "Missing Token" })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next()
    }
    catch(error){
        console.error("JWT Error:",error);
        res.status(401).json({error:"Invalid Token"})
    }
}