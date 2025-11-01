import React from "react";
import Logo from "../../ui/Logo/Logo";
import { Home, Calendar, Settings, User } from "lucide-react";
import estilos from "./SidebarMenu.module.css";

const SidebarMenu = () => {
  return (
    <aside className={estilos.sidebar}>
      <div className={estilos.logoArea}>
        <Logo tamanho="pequeno" />
      </div>

      <nav className={estilos.menu}>
        <a className={`${estilos.item} ${estilos.ativo}`}><Home size={20}/> Início</a>
        <a className={estilos.item}><Settings size={20}/> Negócios</a>
        <a className={estilos.item}><Calendar size={20}/> Agendamentos</a>
      </nav>

      <div className={estilos.usuario}>
        <User size={24}/> <span>Thiago</span>
      </div>
    </aside>
  );
};

export default SidebarMenu;
