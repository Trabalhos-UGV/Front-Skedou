import React from "react";
import Logo from "../../ui/Logo/Logo";
import { Home, Calendar, Settings, User } from "lucide-react";
import estilos from "./SidebarMenu.module.css";

const SidebarMenu = () => {
  return (
    <aside className={estilos.sidebar}>
      {/* LOGO NO TOPO */}
      <div className={estilos.logoArea}>
        <Logo tamanho="medio" />
      </div>

      {/* MENUS CENTRALIZADOS */}
      <nav className={estilos.menu}>
        <a className={`${estilos.item} ${estilos.ativo}`}>
          <Home size={20} /> Início
        </a>
        <a className={estilos.item}>
          <Settings size={20} /> Negócios
        </a>
        <a className={estilos.item}>
          <Calendar size={20} /> Agendamentos
        </a>
      </nav>

      {/* ÁREA DO USUÁRIO NO RODAPÉ */}
      <div className={estilos.usuario}>
        <User size={24} /> <span>Thiago</span>
      </div>
    </aside>
  );
};

export default SidebarMenu;
