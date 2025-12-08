import express from "express";
import { createAuction, getActiveAuctions, getAuctionById, getClosedAuctions, getUpcomingAuctions } from "../controllers/auction.controller.js";
const router=express.Router();

router.post("/create",createAuction);
router.get("/active",getActiveAuctions);
router.get("/upcoming",getUpcomingAuctions);
router.get("/closed",getClosedAuctions);
router.get("/:id",getAuctionById);

export default router;