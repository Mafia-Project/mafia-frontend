import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import GameRoom from './pages/GameRoom'
import ParentComponent from './components/Chat/ParentComponent'
import GameRoomBodyComponent from './components/GameRoomBodyComponent'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path='/rooms/:id' element={<GameRoom />} />
        <Route path='/chat' element={<ParentComponent />} />
        <Route path='/gameRoom' element={<GameRoomBodyComponent />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
