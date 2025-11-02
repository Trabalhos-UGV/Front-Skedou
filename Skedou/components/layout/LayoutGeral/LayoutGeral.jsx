import React from "react";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import estilos from "./LayoutGeral.module.css";


//recebendo props
const LayoutGeral = ({ children, paginaAtual, aoMudarPagina, aoDeslogar }) => {
  return (
    <div className={estilos.layout}>
      <SidebarMenu 
        paginaAtual={paginaAtual}
        aoMudarPagina={aoMudarPagina}
        aoDeslogar={aoDeslogar}
      />
      <main className={estilos.conteudo}>
        {children}
      </main>
    </div>
  );
};

export default LayoutGeral;