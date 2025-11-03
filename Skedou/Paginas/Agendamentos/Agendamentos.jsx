import React, { useState, useEffect } from "react";
import CardAgendamento from "../../components/ui/Cards/CardAgendamento/CardAgendamento";
import { listarMinhasSolicitacoes } from "../../services/agendamentosService";
import estilos from "./Agendamentos.module.css";

const Agendamentos = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarAgendamentos();
  }, []);

  const carregarAgendamentos = async () => {
    setCarregando(true);
    try {
      const resposta = await listarMinhasSolicitacoes();
      setAgendamentos(resposta.agendamentos || []);
    } catch (erro) {
      console.error("Erro ao carregar agendamentos:", erro);
      setAgendamentos([]);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className={estilos.container}>
      <h1 className={estilos.titulo}>Meus Agendamentos</h1>
      <p className={estilos.subtitulo}>Agendamentos que você fez em outros negócios</p>

      {carregando ? (
        <div className={estilos.carregando}>Carregando agendamentos...</div>
      ) : agendamentos.length > 0 ? (
        <div className={estilos.listaAgendamentos}>
          {agendamentos.map((agendamento) => (
            <CardAgendamento 
              key={agendamento.agd_cod} 
              agendamento={agendamento}
              aoAtualizar={carregarAgendamentos}
            />
          ))}
        </div>
      ) : (
        <div className={estilos.vazio}>
          <p>Você ainda não fez nenhum agendamento</p>
        </div>
      )}

      <div className={estilos.marcaDagua}>S</div>
    </div>
  );
};

export default Agendamentos;