import React from "react";
import { Calendar, Clock, User, CheckCircle, XCircle } from "lucide-react";
import Botao from "../../Geral/Botão/Botao";
import estilos from "./CardAgendamento.module.css";

const CardAgendamento = ({ agendamento }) => {
  const formatarData = (data) => {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const getStatusClasse = (status) => {
    switch (status) {
      case "confirmado":
        return estilos.confirmado;
      case "cancelado":
        return estilos.cancelado;
      default:
        return estilos.pendente;
    }
  };

  const getStatusTexto = (status) => {
    switch (status) {
      case "confirmado":
        return "Confirmado";
      case "cancelado":
        return "Cancelado";
      default:
        return "Pendente";
    }
  };

  return (
    <div className={estilos.card}>
      <div className={estilos.header}>
        <div className={estilos.clienteInfo}>
          <div className={estilos.avatar}>
            <User size={24} />
          </div>
          <div>
            <h3 className={estilos.nomeCliente}>{agendamento.cliente}</h3>
            <p className={estilos.servico}>{agendamento.servico}</p>
          </div>
        </div>
        <div className={`${estilos.status} ${getStatusClasse(agendamento.status)}`}>
          {agendamento.status === "confirmado" && <CheckCircle size={16} />}
          {agendamento.status === "cancelado" && <XCircle size={16} />}
          <span>{getStatusTexto(agendamento.status)}</span>
        </div>
      </div>

      <div className={estilos.detalhes}>
        <div className={estilos.detalheItem}>
          <Calendar size={18} />
          <span>{formatarData(agendamento.data)}</span>
        </div>
        <div className={estilos.detalheItem}>
          <Clock size={18} />
          <span>
            {agendamento.horarioInicio} às {agendamento.horarioFim}
          </span>
        </div>
      </div>

      {agendamento.status === "pendente" && (
        <div className={estilos.acoes}>
          <Botao variacao="secundario" tamanho="pequeno">
            Cancelar
          </Botao>
          <Botao variacao="primario" tamanho="pequeno">
            Confirmar
          </Botao>
        </div>
      )}
    </div>
  );
};

export default CardAgendamento;