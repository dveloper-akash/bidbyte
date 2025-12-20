import { GoogleLogin } from "@react-oauth/google";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "../lib/axios";
import { useAuth } from "../auth/useAuth";
import { X } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const location=useLocation();
  const from = location.state?.from?.pathname?location.state.from.pathname + (location.state.from.search || "") : "/";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user]);


  const handleClose = () => {
    navigate(-1); 
  };

  const handleSuccess = async (response) => {
    try {
      const res = await api.post("/auth/google", {
        idToken: response.credential,
      });
      setUser(res.data.user);
      // navigate(from, { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Try again.");
    }
  };
  

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm px-4"
      onClick={handleClose}
    >

      <div
        className="
          relative w-full max-w-sm
          bg-linear-to-b from-amber-50 to-orange-100
          rounded-2xl shadow-2xl
          p-6 sm:p-8
          flex flex-col items-center gap-6
          animate-fade-in
        "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          aria-label="Close login modal"
          className="
            absolute top-3 right-3 cursor-pointer
            rounded-full p-2
            text-slate-500 hover:text-slate-800
            hover:bg-slate-200/50
            transition
          "
        >
          <X/>
        </button>

        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-slate-800">
            Welcome to Bid<span className="text-amber-500">Byte</span>
          </h1>
          <p className="text-sm text-slate-600">
            Sign in to start bidding
          </p>
        </div>

        <div className="w-full h-px bg-slate-200" />

        <div className="w-full flex justify-center">
          <div className="scale-90 sm:scale-100 origin-top">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => {
                console.error("Google Login Failed");
                alert("Google Login failed.");
              }}
              theme="outline"
              size="large"     
              width="240"       
            />
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-slate-500 text-center">
          Secure login • No passwords stored
        </p>
      </div>
    </div>
  );
};

export default Login;
