import api from "./api";

export const listarMinhasSolicitacoes = async () => {
  try {
    const resposta = await api.get("/api/agendamentos/minhas-solicitacoes");
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao listar minhas solicitações:", erro);
    throw erro;
  }
};

export const listarSolicitacoesRecebidas = async () => {
  try {
    const resposta = await api.get("/api/agendamentos/solicitacoes-recebidas");
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao listar solicitações recebidas:", erro);
    throw erro;
  }
};

export const criarAgendamento = async (dados) => {
  try {
    const resposta = await api.post("/api/agendamentos", dados);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao criar agendamento:", erro);
    throw erro;
  }
};

export const atualizarStatusAgendamento = async (id, status) => {
  try {
    const resposta = await api.patch(`/api/agendamentos/${id}/status`, { status });
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao atualizar status:", erro);
    throw erro;
  }
};

export const cancelarAgendamento = async (id) => {
  try {
    const resposta = await api.delete(`/api/agendamentos/${id}`);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao cancelar agendamento:", erro);
    throw erro;
  }
};

export const obterHorariosDisponiveis = async (negocioId, data) => {
  try {
    const resposta = await api.get(`/api/agendamentos/horarios-disponiveis`, {
      params: { negocioId, data }
    });
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao obter horários:", erro);
    throw erro;
  }
};