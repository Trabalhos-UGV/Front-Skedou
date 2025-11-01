import axios from "axios";//biblioteca q faz auth http

const api = axios.create({
  baseURL: "http://localhost:3000/api", 
});

export const cadastrarUsuario = async (dados) => {
  try {
    const resposta = await api.post("??", dados);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao cadastrar:", erro);
    throw erro;
  }
};

export const logarUsuario = async (dados) => {
  try {
    const resposta = await api.post("??", dados);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao logar:", erro);
    throw erro;
  }
};
