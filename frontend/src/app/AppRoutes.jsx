import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "../auth/ProtectedRoute"
import Home from "../pages/Home"
import Login from "../pages/Login"
import MainLayout from "../components/layout/MainLayout"


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
      </Route>      
    </Routes>
  )
}

export default AppRoutes