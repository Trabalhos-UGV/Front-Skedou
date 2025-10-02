import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Botao from '../components/ui/Botão/Botao.jsx'
import Input from '../components/ui/CampoTexto/Input.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Input />
    <Botao>Enviar</Botao>
  </StrictMode>,
)
