import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import PreCadastro from './PreCadastro'
import Prevenda from './Prevenda'
import NovaPg from './NovaPg'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NovaPg />} />
        <Route path="/prevenda" element={<Prevenda />} />
        <Route path="/precadastro" element={<PreCadastro />} />
        <Route path="/novapg" element={<NovaPg />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
