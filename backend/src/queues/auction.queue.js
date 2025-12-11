import { Queue } from 'bullmq';
import { redis } from '../config/redis.js';

export const auctionQueue= new Queue("auctionQueue",{
    connection:redis
})