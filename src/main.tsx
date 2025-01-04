import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import App from './App.tsx'
import CreateGame from './pages/CreateGame.tsx'
import JoinGame from './pages/JoinGame.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/create' element={<CreateGame />} />
      <Route path='/join' element={<JoinGame />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
