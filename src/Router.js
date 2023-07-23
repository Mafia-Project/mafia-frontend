import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import GameRoomComponent from './components/Game/GameRoomComponent'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
         <Route path='/rooms/:id/:host' element={<GameRoomComponent />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
