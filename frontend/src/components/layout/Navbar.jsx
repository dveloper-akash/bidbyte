import { Link } from "react-router-dom";
import { useAuth } from "../../auth/useAuth"

const Navbar=()=>{
    const {user, logout}=useAuth();
    return(
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <Link to="/" className="text-xl font-bold text-slate-800">
                        Bid<span className="text-amber-500">Byte</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-6">
                        { user ? (
                            <>
                                <Link className="text-slate-600 hover:text-slate-900" to="/create-auction">Create Auction</Link>
                                <Link className="text-slate-600 hover:text-slate-900" to="/my-auctions">My Auctions</Link>
                                <button onClick={logout} className="px-4 py-2 rounded-lg bg-amber-500 font-bold text-white hover:bg-amber-600 transition">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="px-4 py-2 rounded-lg bg-amber-500 font-bold text-white hover:bg-amber-600 transition" >
                                Login
                            </Link>
                        )}
                    </div>
                    <div className="md:hidden">
                        { user ? (
                            <button onClick={logout} classname="text-sm font-medium text-amber-600">
                                Logout
                            </button>
                        ):(
                            <Link to="/login" className="text-sm font-medium text-amber-600">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;