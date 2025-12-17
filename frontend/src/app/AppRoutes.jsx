import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "../auth/ProtectedRoute"
import Home from "../pages/Home"
import Login from "../pages/Login"
import MainLayout from "../components/layout/MainLayout"
import AuctionDetail from "../pages/AuctionDetail"
import CreateAuction from "../pages/CreateAuction"


const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout/>}>
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
          }
        />      
        <Route path='/create-auction' element={
          <ProtectedRoute>
            <CreateAuction/>
          </ProtectedRoute>
          }
        />      
        <Route path='/auction/:id' element={
          <ProtectedRoute>
            <AuctionDetail/>
          </ProtectedRoute>
          }
        />      
      </Route>      
    </Routes>
  )
}

export default AppRoutes