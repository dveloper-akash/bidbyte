import { createContext, useContext, useEffect, useState } from "react";
import api from '../lib/axios.js';

const AuthContext=createContext(null);

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [loading, setLoading]=useState(true);

    useEffect( ()=>{
        const fetchme =async()=>{
            try{
                const res=await api.get("/auth/me");
                // console.log(res.data);
                setUser(res.data);
            }
            catch(error){
                setUser(null);
            }
            finally{
                setLoading(false);
            }
            
        }
        fetchme();
    },[])

    const logout=async()=>{
        try{
            await app.post("/auth/logout");
        }
        catch(error){
            console.error("Logout failed",err); 
        }
        finally{
            setUser(null)
        }
    }

    return(
        <AuthContext.Provider 
            value={{
                user,
                isAuthenticated: !!user,
                loading,
                logout,
                setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
    
}
export const useAuthContext =()=> useContext(AuthContext);