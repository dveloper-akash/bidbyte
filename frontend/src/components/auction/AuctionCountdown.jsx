import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { getRemainingTimeParts } from "../../utils/countdown";


const AuctionCountdown =({endTime,status})=>{
    const [remaining, setRemaining] =useState(()=>
        getRemainingTimeParts(endTime)
    )

    useEffect(()=>{
        if (status !=="ACTIVE") return;
        if (remaining.totalSeconds > 300) return;

        const interval = setInterval(()=>{
            setRemaining(getRemainingTimeParts(endTime));
        },1000);

        return ()=> clearInterval(interval);
    },[remaining.totalSeconds, endTime, status]);

    if (status !=="ACTIVE") return null;

    return(
        <div className="flex items-center gap-2 text-amber-600 text-sm sm:text-base">
            <Clock size={16} />
            <span className="font-medium">
                {remaining.totalSeconds <= 0
                ? "Ended"
                : remaining.totalSeconds > 300
                ? `Ends in ${
                    remaining.days
                        ? `${remaining.days}d `
                        : remaining.hours
                        ? `${remaining.hours}h `
                        : ""
                    }${remaining.minutes}m`
                : `Ending in ${remaining.minutes}m ${remaining.seconds}s`}
            </span>
        </div>
    )
}

export default AuctionCountdown;