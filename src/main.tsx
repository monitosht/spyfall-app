import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import './index.css'
import App from './App.tsx'
import CreateGame from './pages/CreateGame.tsx'
import JoinGame from './pages/JoinGame.tsx'
import LobbyPage from './pages/LobbyPage.tsx'
import ErrorPage from './pages/ErrorPage.tsx'
import GamePage from './pages/GamePage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/create' element={<CreateGame />} />
        <Route path='/join' element={<JoinGame />} />
        <Route path='/join/:gamepin' element={<JoinGame />} />
        <Route path='/lobby/:gamepin' element={<LobbyPage />} />
        <Route path='/game/:gamepin' element={<GamePage />} />
        <Route path='/error/:code' element={<ErrorPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      </HashRouter>
    </Provider>
  </StrictMode>
)
