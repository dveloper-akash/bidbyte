import { useEffect } from "react"
import api from "../../lib/axios"


const GoogleLoginButton = () => {
    useEffect(() => {
        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse
        })

        google.accounts.id.renderButton(
            document.getElementById("googleBtn"),
            { theme: "outline", size: "large" }
        )
    }, [])

    const handleGoogleResponse = async (res) => {
        const idToken=res.credential;
    
        try {
            const response = await api.post("/auth/google", { idToken });
            console.log("User:", response.data.user);
            // window.location.href = "/"
        } 
        catch (err) {
            console.error(err);
            alert("Google login failed");
        }

    }
    return (
        <div id="googleBtn"></div>
    )
}

export default GoogleLoginButton

