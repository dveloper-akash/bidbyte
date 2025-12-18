import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import api from "../lib/axios.js"
import Spinner from "../components/ui/Spinner.jsx"
import AuctionCountdown from "../components/auction/AuctionCountdown.jsx";
import AuctionBidBox from "../components/auction/AuctionBidBox";
import { CheckCircle } from "lucide-react";
import { useAuth } from "../auth/useAuth.js";
import { socket } from "../lib/socket.js";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../lib/reactQuery.js";

const fetchAuction = async ({ queryKey }) => {
  const [, id] = queryKey;
  const res = await api.get(`/api/auctions/${id}`);
  return res.data;
};

const AuctionDetail=()=>{
    const { user }=useAuth();
    const {id}=useParams();
    
    const {data: auction, isLoading} = useQuery({
        queryKey: ["auction", id],
        queryFn: fetchAuction,
        enabled: !!id,
    });

    useEffect(() => {
        if (!id) return;

        socket.emit("auction:join", id);

        const handleBidPlaced = (data) => {
            if (data.auctionId === id) {
            queryClient.setQueryData(["auction", id], (prev) =>
                prev ? { ...prev, currentPrice: data.newPrice } : prev
            );
            }
        };

        const handleAuctionStarted = (data) => {
            if (data.auctionId === id) {
            queryClient.setQueryData(["auction", id], (prev) =>
                prev ? { ...prev, status: "ACTIVE" } : prev
            );
            }
        };

        const handleAuctionEnded = (data) => {
            if (data.auctionId === id) {
            queryClient.setQueryData(["auction", id], (prev) =>
                prev ? { ...prev, status: "CLOSED" } : prev
            );
            }
        };

        socket.on("bid:placed", handleBidPlaced);
        socket.on("auction:started", handleAuctionStarted);
        socket.on("auction:ended", handleAuctionEnded);

        return () => {
            socket.emit("auction:leave", id);
            socket.off("bid:placed", handleBidPlaced);
            socket.off("auction:started", handleAuctionStarted);
            socket.off("auction:ended", handleAuctionEnded);
        };
    }, [id]);


    if (isLoading) {
        return <Spinner/>;
    }

    if (!auction) {
        return (
            <div className="p-6 text-center text-slate-500">
                Auction not found
            </div>
        );
    }

    const {title, imageUrl, currentPrice, startTime, endTime, status, sellerId}=auction;

    return(
        <div className="w-full px-4 py-6 space-y-6 max-w-3xl mx-auto">

            <div className="w-full h-56 sm:h-64 bg-slate-200 rounded-xl overflow-hidden">
                <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
            </div>

            <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-800">{title}</h1>
                <p className="text-sm text-slate-500 capitalize">Status: {status.toLowerCase()}</p>
            </div>

            { status !== "UPCOMING" && (
                <div className="bg-white rounded-xl p-4 shadow-sm">
                    <p className="text-slate-500 text-sm">Current Bid</p>
                    <p className="text-3xl font-bold text-slate-800">₹{currentPrice}</p>
                </div>
            )}

            <AuctionCountdown endTime={endTime} status={status}/>

            {status==="ACTIVE" && sellerId!==user.id && <AuctionBidBox auctionId={id} currentPrice={currentPrice} />}

            {status === "UPCOMING" && (
                <p className="text-center text-slate-500">
                    Starts at {new Date(startTime).toLocaleString()}
                </p>
            )}

            {status === "CLOSED" && (
                <div className="flex items-center justify-center gap-2 text-green-600">
                    <CheckCircle size={16} />
                    <span className="font-medium">Auction closed</span>
                </div>
            )}

        </div>
    )
}

export default AuctionDetail;