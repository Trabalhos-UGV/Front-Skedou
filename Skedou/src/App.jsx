import React from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import Autenticacao from "../Paginas/Autenticacao/Autenticacao";
import Inicio from "../Paginas/Inicio/Inicio";
import Negocios from "../Paginas/Negocios/Negocios";
import Agendamentos from "../Paginas/Agendamentos/Agendamentos";
import LayoutGeral from "../components/layout/LayoutGeral/LayoutGeral";

function Conteudo() {
  const { usuario, login, logout, carregando, paginaAtual, mudarPagina } = useAuth();

  if (carregando) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
        color: 'white',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '1.2rem'
      }}>
        Carregando...
      </div>
    );
  }
  if (!usuario) {
    return <Autenticacao aoLogar={login} />;
  }
  const renderizarPagina = () => {
    switch (paginaAtual) {
      case "inicio":
        return <Inicio />;
      case "negocios":
        return <Negocios />;
      case "agendamentos":
        return <Agendamentos />;
      default:
        return <Inicio />;
    }
  };

  return (
    <LayoutGeral 
      paginaAtual={paginaAtual}
      aoMudarPagina={mudarPagina}
      aoDeslogar={logout}
    >
      {renderizarPagina()}
    </LayoutGeral>
  );
}

function App() {
  return (
    <AuthProvider>
      <Conteudo />
    </AuthProvider>
  );
}

export default App;