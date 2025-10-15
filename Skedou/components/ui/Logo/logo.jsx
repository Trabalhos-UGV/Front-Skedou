import React from "react";
import estilos from  "./Logo.module.css";
import logoImg from "/Users/thiago/Documents/eng_software/Front-Skedou/Skedou/public/images/logo.png";

const Logo = ({
  tamanho = 'grande', //tamanho padrao
  className = ''  //classes extras
}) => {

  return (
    //container da logo,tamanho e classes extras
    <div className={`${estilos.Logo} ${estilos[tamanho]} ${className}`}>
      
      <img

      src={logoImg}

      alt="Skedou Logo"

      className={estilos.imagemLogo}
      />
    </div>
  );
};


export default Logo;
