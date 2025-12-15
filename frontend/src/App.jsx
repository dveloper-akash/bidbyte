import React from 'react'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login/>} />
    </Routes>
  )
}

export default App