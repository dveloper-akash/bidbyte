import express from "express";
import { getAuthUser, googleAuth, logoutUser } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router=express.Router();

router.post("/google",googleAuth);
router.get("/me",verifyToken,getAuthUser);
router.get("/me",verifyToken,getAuthUser);
router.post("/logout",logoutUser);

export default router;