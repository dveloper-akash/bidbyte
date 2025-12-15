import React from 'react'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './auth/ProtectedRoute'
import Home from './pages/Home'

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/' element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App