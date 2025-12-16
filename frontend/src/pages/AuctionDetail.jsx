import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import api from "../lib/axios.js"
import Spinner from "../components/ui/Spinner.jsx"
import AuctionCountdown from "../components/auction/AuctionCountdown.jsx";
import AuctionBidBox from "../components/auction/AuctionBidBox";
import { CheckCircle } from "lucide-react";

const socket = io(import.meta.env.VITE_BASE_URL,{
    withCredentials:true
})

const AuctionDetail=()=>{
    const {id}=useParams();
    const [auction, setAuction]=useState(null);
    const [loading, setLoading]=useState(true);

    useEffect(()=>{
        const fetchAuction=async()=>{
            try{
                const res=await api.get(`/api/auctions/${id}`);
                setAuction(res.data);
            }
            catch(err){
                console.error("Failed to load auction",err);
            }
            finally{
                setLoading(false);
            }
        }
        fetchAuction();
    },[id]);

    useEffect(()=>{
        if (!id) return;

        socket.emit("auction:join", id);
        socket.on("bid:placed", (data)=>{
            if(data.auctionId===id){
                setAuction((prev)=>
                    prev? {...prev,currentPrice:data.newPrice} : prev
                )
            }
        })

        socket.on("auction:ended",(data)=>{
            if (data.auctionid === id){
                setAuction((prev)=>{
                    prev ? {...prev,status:"CLOSED"} : prev
                })
            }
        })

        return () => {
            socket.emit("auction:leave", id);
            socket.off("bid:placed");
            socket.off("auction:ended");
        };

    },[id])

    if (loading) {
        return <Spinner/>;
    }

    if (!auction) {
        return (
            <div className="p-6 text-center text-slate-500">
                Auction not found
            </div>
        );
    }

    const {title, imageUrl, currentPrice, startTime, endTime, status}=auction;

    return(
        <div className="h-full w-full px-4 py-6 space-y-6 max-w-3xl mx-auto">

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

            {status==="ACTIVE" && <AuctionBidBox auctionId={id} currentPrice={currentPrice} />}

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