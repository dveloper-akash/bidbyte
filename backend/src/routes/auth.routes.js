import express from "express";
import { getAuthUser, googleAuth } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router=express.Router();

router.post("/google",googleAuth);
router.get("/me",verifyToken,getAuthUser);

export default router;