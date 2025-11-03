import React from "react";
import { Star, Clock, MapPin } from "lucide-react";
import Botao from "../../Geral/Botão/Botao";
import estilos from "./CardNegocio.module.css";

const CardNegocio = ({ negocio }) => {
  return (
    <div className={estilos.card}>
      <div className={estilos.imagemContainer}>
        <div className={estilos.logoCirculo}>
          <img
            src={negocio.imagem}
            alt={negocio.nome}
            className={estilos.imagem}
          />
        </div>
      </div>

      <h2 className={estilos.nome}>{negocio.nome}</h2>
      <p className={estilos.descricao}>{negocio.descricao}</p>

      <div className={estilos.info}>
        <div className={estilos.linha}>
          <Star size={18} fill="#FFD700" color="#FFD700" />
          <span>
            {negocio.avaliacao} {negocio.avaliacoes} avaliações
          </span>
        </div>
        <div className={estilos.linha}>
          <Clock size={18} />
          <span>{negocio.horario}</span>
        </div>
        <div className={estilos.linha}>
          <MapPin size={18} />
          <span>{negocio.endereco}</span>
        </div>
      </div>

      <div className={estilos.botoes}>
        <Botao variacao="secundario" tamanho="pequeno">
          Contato
        </Botao>
        <Botao variacao="primario" tamanho="pequeno">
          Agendar
        </Botao>
      </div>
    </div>
  );
};

export default CardNegocio;