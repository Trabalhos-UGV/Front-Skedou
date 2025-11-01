import React from "react";
import estilos from "./TabsCategorias.module.css";

const TabsCategorias = ({ categorias, selecionada, aoSelecionar }) => {
  return (
    <div className={estilos.container}>
      {categorias.map((cat) => (
        <button
          key={cat}
          onClick={() => aoSelecionar(cat)}
          className={`${estilos.tab} ${cat === selecionada ? estilos.ativa : ""}`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default TabsCategorias;
