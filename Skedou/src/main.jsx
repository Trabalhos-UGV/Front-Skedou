import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Botao from '../components/ui/Botão/Botao.jsx'
import Span from '../components/ui/CampoTexto/Span.jsx'
import Input from '../components/ui/CampoTexto/Input.jsx'
import { Profile } from '../components/ui/Logo/logo.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Profile></Profile>
    <Span>Login</Span>
    <Input />
    <Span>Senha</Span>
    <Input />
    <Botao>Logar</Botao>
  </StrictMode>,
)
