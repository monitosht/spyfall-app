import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import './index.css'
import App from './App.tsx'
import CreateGame from './pages/CreateGame.tsx'
import JoinGame from './pages/JoinGame.tsx'
import LobbyPage from './pages/LobbyPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/create' element={<CreateGame />} />
        <Route path='/join' element={<JoinGame />} />
        <Route path='/lobby' element={<LobbyPage />} />
        <Route path='/lobby/:gamepin' element={<LobbyPage />} />
      </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
