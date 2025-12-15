import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";
import { useAuth } from "../auth/useAuth";

const Login=()=>{
  const navigate=useNavigate();
  const {setUser}=useAuth();

  const handleSuccess= async (response)=>{
    try{
      const res =await api.post("/auth/google",{
        idToken:response.credential
      })
      setUser(res.data.user);
      console.log(res.data.user);
      navigate("/",{replace:true});
    }
    catch(err){
      console.error("Login failed:",err);
      alert("Login failed. Try again.");
    }
  }
  return(
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-800 p-8 rounded-xl shadow-lg text-center flex flex-col gap-6 items-center justify-center">
        <h1 className="text-2xl font-bold text-white">Sign in to BidByte</h1>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={()=>{
            console.error("Google Login Failed")
            alert("Google Login failed.");
          }}
          theme="outline"
        />
      </div>
    </div>
  )
}
export default Login