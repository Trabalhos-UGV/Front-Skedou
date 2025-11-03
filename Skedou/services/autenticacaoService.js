import api from "./api";

export const cadastrarUsuario = async (dados) => {
  try {
    const resposta = await api.post("/api/usuarios/cadastro", dados);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao cadastrar:", erro);
    throw erro;
  }
};

export const logarUsuario = async (dados) => {
  try {
    const resposta = await api.post("/api/usuarios/login", dados);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao logar:", erro);
    throw erro;
  }
};

export const obterPerfilUsuario = async () => {
  try {
    const resposta = await api.get("/api/usuarios/perfil");
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao obter perfil:", erro);
    throw erro;
  }
};