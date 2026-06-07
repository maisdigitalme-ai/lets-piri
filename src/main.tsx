import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import PreCadastro from './PreCadastro'
import Prevenda from './Prevenda'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PreCadastro />} />
        <Route path="/prevenda" element={<Prevenda />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
