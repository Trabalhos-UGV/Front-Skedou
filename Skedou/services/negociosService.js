import api from "./api";

function obterNumeroCategoria(nomeCategoria) {
  const mapa = {
    "Mecânica": 1,
    "Cabeleireiro": 2,
    "Manicure": 3
  };
  return mapa[nomeCategoria] || 1;
}
export const listarNegocios = async (categoria = null) => {
  try {
    let url = "/api/empresas"; 
    if (categoria && categoria !== "Geral") {
      const categoriaNumero = obterNumeroCategoria(categoria);
      url = `/api/empresas/categoria/${categoriaNumero}`;
    }

    const resposta = await api.get(url);
    console.log("Resposta bruta da API:", resposta);
    console.log("Resposta data:", resposta.data);

    return resposta.data;
  } catch (erro) {
    console.error("Erro ao listar negócios:", erro);
    throw erro;
  }
};

export const obterNegocioPorId = async (id) => {
  try {
    const resposta = await api.get(`/api/empresas/buscaUser/${id}`);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao obter negócio:", erro);
    throw erro;
  }
};

export const cadastrarNegocio = async (dados) => {
  try {
    const resposta = await api.post("/api/empresas/cadastro", dados);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao cadastrar negócio:", erro);
    throw erro;
  }
};

export const atualizarNegocio = async (id, dados) => {
  try {
    const resposta = await api.put(`/api/negocios/${id}`, dados);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao atualizar negócio:", erro);
    throw erro;
  }
};

export const obterMeuNegocio = async (id) => {
  try {
    const resposta = await api.get(`/api/empresas/buscaUser/${id}`);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao obter meu negócio:", erro);
    throw erro;
  }
};