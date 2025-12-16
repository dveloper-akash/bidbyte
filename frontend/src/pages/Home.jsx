import { useEffect, useState } from "react";
import api from "../lib/axios.js"
import AuctionGrid from "../components/auction/AuctionGrid.jsx";
const TABS=["active","upcoming","closed"];
const Home = () => {
  const [status, setStatus]=useState("active");
  const [auctions, setAuctions]=useState([]);
  const [loading, setLoading]=useState(true);

  useEffect(()=>{
    const controller= new AbortController();
    const fetchAuctions=async()=>{
      try{
        setLoading(true);
        const res=await api.get(`/api/auctions/${status}`,{
          signal: controller.signal
        })
        setAuctions(res.data);
      }
      catch(err){
        console.error(err);
        setAuctions([]);
      }
      finally{
        setLoading(false)
      }
    }
    fetchAuctions();
    return()=>{
      controller.abort();
    }
  },[status]);

  return (
    <div className="h-full w-full px-4 py-6">
      <div className="mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Auctions</h1>
        <p className="text-slate-500 mt-1">Bid live or explore what's next</p>
      </div>
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {TABS.map((tab)=>(
          <button key={tab} onClick={()=>setStatus(tab)} className={`px-4 py-2 rounded-full text-sm font-medium capitalize
              transition whitespace-nowrap
              ${
                status === tab
                  ? "bg-amber-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}>
                {tab}
          </button>
        ))}
      </div>
      <AuctionGrid auctions={auctions} loading={loading} status={status} />
    </div>
  )
}

export default Home