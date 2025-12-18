import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './auth/AuthProvider.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './app/App.jsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/reactQuery.js'
import SocketProvider from './websockets/SocketProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <BrowserRouter>
              <App />      
            </BrowserRouter>
          </AuthProvider>   
        </GoogleOAuthProvider>
      </SocketProvider>
    </QueryClientProvider>     
  </StrictMode>,
)
