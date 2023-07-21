import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import GameRoom from './pages/GameRoom'
import ParentComponent from './components/Chat/ParentComponent'
import GameRoomComponent from './components/Game/GameRoomComponent'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path='/rooms/:id/:host' element={<GameRoom />} />
        <Route path='/chat' element={<ParentComponent />} />
        <Route path='/gameRoom/:id' element={<GameRoomComponent />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
