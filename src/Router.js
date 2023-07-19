import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import GameRoom from './pages/GameRoom'
import GameRoomWrapper from './pages/GameRoom'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path='/rooms/:id' element={<GameRoomWrapper />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
