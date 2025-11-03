import React from "react";
import { Clock, DollarSign, Edit, Trash2 } from "lucide-react";
import { deletarServico } from "../../../../services/servicosService";
import estilos from "./CardServico.module.css";

const CardServico = ({ servico, negocioId, aoAtualizar }) => {
  const handleDeletar = async () => {
    if (window.confirm("Tem certeza que deseja deletar este serviço?")) {
      try {
        await deletarServico(negocioId, servico.srv_cod);
        //alert("Serviço deletado com sucesso!");
        aoAtualizar();
      } catch (erro) {
        console.error("Erro ao deletar serviço:", erro);
        //alert("Erro ao deletar serviço");
      }
    }
  };

  return (
    <div className={estilos.card}>
      <div className={estilos.header}>
        <h3 className={estilos.nome}>{servico.srv_nom}</h3>
        <div className={estilos.acoes}>
          <button className={estilos.botaoIcone} title="Editar">
            <Edit size={16} />
          </button>
          <button
            className={estilos.botaoIcone}
            onClick={handleDeletar}
            title="Deletar"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className={estilos.info}>
        <div className={estilos.infoItem}>
          <Clock size={18} />
          <span>{servico.srv_dur}h de duração</span>
        </div>
        <div className={estilos.infoItem}>
          <DollarSign size={18} />
          <span>
            {servico.srv_val === "Consultar" || !servico.srv_val
              ? "Consultar"
              : `R$ ${servico.srv_val}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardServico;
