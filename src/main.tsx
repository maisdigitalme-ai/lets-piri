import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PreCadastro from './PreCadastro'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PreCadastro />
  </StrictMode>,
)
