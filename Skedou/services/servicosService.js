import api from "./api";

export const listarServicos = async (negocioId) => {
  try {
    const resposta = await api.get(`/api/negocios/${negocioId}/servicos`);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao listar serviços:", erro);
    throw erro;
  }
};

export const cadastrarServico = async (negocioId, dados) => {
  try {
    const resposta = await api.post(`/api/negocios/${negocioId}/servicos`, dados);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao cadastrar serviço:", erro);
    throw erro;
  }
};

export const atualizarServico = async (negocioId, servicoId, dados) => {
  try {
    const resposta = await api.put(`/api/negocios/${negocioId}/servicos/${servicoId}`, dados);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao atualizar serviço:", erro);
    throw erro;
  }
};

export const deletarServico = async (negocioId, servicoId) => {
  try {
    const resposta = await api.delete(`/api/negocios/${negocioId}/servicos/${servicoId}`);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao deletar serviço:", erro);
    throw erro;
  }
};