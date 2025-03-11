import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {HeroUIProvider} from '@heroui/react'
import Landing from './Landing.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <HeroUIProvider>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/app' element={<App/>} />
      </Routes>
    </HeroUIProvider>
    </BrowserRouter>
  </StrictMode>
)
