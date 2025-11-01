import React from "react";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import estilos from "./LayoutGeral.module.css";

const LayoutGeral = ({ children }) => {
  return (
    <div className={estilos.layout}>
      <SidebarMenu />
      <main className={estilos.conteudo}>{children}</main>
    </div>
  );
};

export default LayoutGeral;
