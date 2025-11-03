import React from "react";
import { X } from "lucide-react";
import estilos from "./Modal.module.css";

const Modal = ({ aberto, aoFechar, titulo, children }) => {
  if (!aberto) return null;

  return (
    <div className={estilos.overlay} onClick={aoFechar}>
      <div className={estilos.modal} onClick={(e) => e.stopPropagation()}>
        <div className={estilos.header}>
          <h2 className={estilos.titulo}>{titulo}</h2>
          <button className={estilos.botaoFechar} onClick={aoFechar}>
            <X size={24} />
          </button>
        </div>
        <div className={estilos.conteudo}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;