import React, { useState, useEffect, useRef } from "react";
import Logo from "../../ui/Geral/Logo/Logo";
import {
  Home,
  Calendar,
  Settings,
  User,
  LogOut,
  ChevronUp,
  Camera,
  Edit,
} from "lucide-react";
import estilos from "./SidebarMenu.module.css";
import { useAuth } from "../../../context/AuthContext"; 

const SidebarMenu = () => {
  const { paginaAtual, mudarPagina, logout } = useAuth(); 

  const [nomeUsuario, setNomeUsuario] = useState("Usuário");
  const [emailUsuario, setEmailUsuario] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {

    const usuarioSalvo = localStorage.getItem("usuario");
    if (usuarioSalvo) {
      const usuario = JSON.parse(usuarioSalvo);
      setNomeUsuario(usuario.nome || "Usuário");
      setEmailUsuario(usuario.email || "");
    }
  }, []);

  useEffect(() => {
    const handleClickFora = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(false);
      }
    };

    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  const toggleMenu = () => setMenuAberto(!menuAberto);

  return (
    <aside className={estilos.sidebar}>
      <div className={estilos.logoArea}>
        <Logo tipo="secundaria" tamanho="pequeno" />
      </div>

      <nav className={estilos.menu}>
        <a
          onClick={() => mudarPagina("inicio")}
          className={`${estilos.item} ${
            paginaAtual === "inicio" ? estilos.ativo : ""
          }`}
        >
          <Home size={20} /> Início
        </a>

        <a
          onClick={() => mudarPagina("negocios")}
          className={`${estilos.item} ${
            paginaAtual === "negocios" ? estilos.ativo : ""
          }`}
        >
          <Settings size={20} /> Negócios
        </a>

        <a
          onClick={() => mudarPagina("agendamentos")}
          className={`${estilos.item} ${
            paginaAtual === "agendamentos" ? estilos.ativo : ""
          }`}
        >
          <Calendar size={20} /> Agendamentos
        </a>
      </nav>

      <div className={estilos.usuarioArea} ref={menuRef}>
        <div
          className={`${estilos.usuario} ${
            menuAberto ? estilos.usuarioAtivo : ""
          }`}
          onClick={toggleMenu}
        >
          <div className={estilos.avatarCirculo}>
            <User size={24} />
          </div>
          <div className={estilos.usuarioInfo}>
            <span className={estilos.nomeUsuario}>{nomeUsuario}</span>
            <span className={estilos.emailUsuario}>{emailUsuario}</span>
          </div>
          <ChevronUp
            size={18}
            className={`${estilos.iconeChevron} ${
              menuAberto ? estilos.chevronRotacionado : ""
            }`}
          />
        </div>

        {menuAberto && (
          <div className={estilos.menuDropdown}>
            <button className={estilos.itemDropdown}>
              <Camera size={18} />
              <span>Alterar Foto</span>
            </button>
            <button className={estilos.itemDropdown}>
              <Edit size={18} />
              <span>Editar Perfil</span>
            </button>
            <button className={estilos.itemDropdown}>
              <Settings size={18} />
              <span>Configurações</span>
            </button>
            <div className={estilos.divider}></div>
            <button
              onClick={logout}
              className={`${estilos.itemDropdown} ${estilos.itemSair}`}
            >
              <LogOut size={18} />
              <span>Sair</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default SidebarMenu;
