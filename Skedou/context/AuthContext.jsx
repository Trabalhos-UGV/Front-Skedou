import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState('inicio');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('usuario');

    if (usuarioSalvo) {
      try {
        const usuarioParseado = JSON.parse(usuarioSalvo);
        setUsuario(usuarioParseado);
      } catch (erro) {
        console.error("Erro ao parsear usuário:", erro);
        localStorage.removeItem('usuario');
      }
    }
    setCarregando(false);
  }, []);

  const login = (dadosUsuario) => {
    setUsuario(dadosUsuario);
    localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
    setPaginaAtual('inicio');
  };

  const mudarPagina = (pagina) => {
    setPaginaAtual(pagina);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
        logout,
        carregando,
        paginaAtual,
        mudarPagina
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
