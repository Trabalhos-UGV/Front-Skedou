import React from "react";
import estilos from  "./Logo.module.css";
import logoImg from "/Users/thiago/Documents/eng_software/Front-Skedou/Skedou/public/images/logo.png";

// Importa as duas logos (cada uma do seu caminho)
import logoPrincipal from "/Users/thiago/Documents/eng_software/Front-Skedou/Skedou/public/images/logo.png";
import logoSecundaria from "/Users/thiago/Documents/eng_software/Front-Skedou/Skedou/public/images/logo2.png";

const Logo = ({
  tamanho = "grande", // Tamanho padrão
  tipo = "principal", // Define qual logo usar
  posicao = "normal", // Posição (normal ou centralizado)
  className = "", // Classes extras
}) => {
  // Define qual imagem usar com base no tipo
  const imagem = tipo === "secundaria" ? logoSecundaria : logoPrincipal;

  return (
    <div
      className={`${estilos.Logo} ${estilos[tamanho]} ${estilos[posicao]} ${className}`}
    >
      <img src={imagem} alt="Skedou Logo" className={estilos.imagemLogo} />
    </div>
  );
};

export default Logo;