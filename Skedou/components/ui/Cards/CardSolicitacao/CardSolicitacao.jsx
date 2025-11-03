import React from "react";
import { Calendar, Clock, User, CheckCircle, XCircle } from "lucide-react";
import Botao from "../../Geral/Botão/Botao";
import { atualizarStatusAgendamento } from "../../../../services/agendamentosService";
import estilos from "./CardSolicitacao.module.css";

const CardSolicitacao = ({ solicitacao, aoAtualizar }) => {
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

  const handleConfirmar = async () => {
    try {
      await atualizarStatusAgendamento(solicitacao.agd_cod, "confirmado");
      //alert("Agendamento confirmado!");
      aoAtualizar();
    } catch (erro) {
      console.error("Erro ao confirmar:", erro);
      //alert("Erro ao confirmar agendamento");
    }
  };

  const handleCancelar = async () => {
    try {
      await atualizarStatusAgendamento(solicitacao.agd_cod, "cancelado");
      //alert("Agendamento cancelado!");
      aoAtualizar();
    } catch (erro) {
      console.error("Erro ao cancelar:", erro);
      //alert("Erro ao cancelar agendamento");
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
            <h3 className={estilos.nomeCliente}>{solicitacao.agd_cli_nom}</h3>
            <p className={estilos.servico}>
              {solicitacao.servico?.srv_nom || "Serviço"}
            </p>
          </div>
        </div>
        <div
          className={`${estilos.status} ${getStatusClasse(
            solicitacao.agd_sta
          )}`}
        >
          {solicitacao.agd_sta === "confirmado" && <CheckCircle size={16} />}
          {solicitacao.agd_sta === "cancelado" && <XCircle size={16} />}
          <span>{getStatusTexto(solicitacao.agd_sta)}</span>
        </div>
      </div>

      <div className={estilos.detalhes}>
        <div className={estilos.detalheItem}>
          <Calendar size={18} />
          <span>{formatarData(solicitacao.agd_dat)}</span>
        </div>
        <div className={estilos.detalheItem}>
          <Clock size={18} />
          <span>
            {solicitacao.agd_hor_inicio} às {solicitacao.agd_hor_fim}
          </span>
        </div>
      </div>

      {solicitacao.agd_sta === "pendente" && (
        <div className={estilos.acoes}>
          <Botao
            variacao="secundario"
            tamanho="pequeno"
            aoClicar={handleCancelar}
          >
            Recusar
          </Botao>
          <Botao
            variacao="primario"
            tamanho="pequeno"
            aoClicar={handleConfirmar}
          >
            Confirmar
          </Botao>
        </div>
      )}
    </div>
  );
};

export default CardSolicitacao;
