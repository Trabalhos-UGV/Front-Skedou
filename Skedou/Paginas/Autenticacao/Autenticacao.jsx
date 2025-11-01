import React, { useState } from "react";
import FormularioLogin from "../../components/ui/FormularioLogin/FormularioLogin";
import FormularioCadastro from "../../components/ui/FormularioCadastro/FormularioCadastro";
import Logo from "../../components/ui/Logo/Logo";
import { cadastrarUsuario, logarUsuario } from "../../services/autenticacaoService";

import estilos from "./Autenticacao.module.css";

const Autenticacao = () => {
  const [ehCadastro, setEhCadastro] = useState(false);

  const [dadosLogin, setDadosLogin] = useState({
    usuario: "",
    senha: "",
  });

  const [dadosCadastro, setDadosCadastro] = useState({
    nomeCompleto: "",
    cpfCnpj: "",
    telefone: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [erro, setErro] = useState("");
  const alternarModo = () => {
    setEhCadastro(!ehCadastro);
    setErro("");
    setDadosLogin({ usuario: "", senha: "" });
    setDadosCadastro({
      nomeCompleto: "",
      cpfCnpj: "",
      telefone: "",
      email: "",
      senha: "",
      confirmarSenha: "",
    });
  };

  const aoMudarLogin = (evento) => {
    const { name, value } = evento.target;
    setDadosLogin((prev) => ({ ...prev, [name]: value }));
    if (erro) setErro("");
  };

  const aoMudarCadastro = (evento) => {
    const { name, value } = evento.target;
    setDadosCadastro((prev) => ({ ...prev, [name]: value }));
    if (erro) setErro("");
  };
  const aoEnviarLogin = async () => {
    if (!dadosLogin.usuario || !dadosLogin.senha) {
      setErro("Preencha todos os campos");
      return;
    }

    try {
      const resposta = await logarUsuario({
        usr_eml: dadosLogin.usuario,
        usr_senha: dadosLogin.senha,
      });

      alert(`Bem-vindo, ${resposta.data.usr_nom || "usuário"}!`);
    } catch (erro) {
      console.error("Erro ao logar:", erro);
      setErro(erro.response?.data?.message || "Erro ao logar");
    }
  };

  const aoEnviarCadastro = async () => {
    const { nomeCompleto, cpfCnpj, telefone, email, senha, confirmarSenha } =
      dadosCadastro;

    if (!nomeCompleto || !cpfCnpj || !telefone || !email || !senha || !confirmarSenha) {
      setErro("Preencha todos os campos");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem");
      return;
    }

    try {
      const resposta = await cadastrarUsuario({
        usr_nom: nomeCompleto,
        usr_cpf: cpfCnpj.replace(/\D/g, ""),
        usr_eml: email,
        usr_tel: telefone.replace(/\D/g, ""),
        usr_senha: senha,
        usr_atv: true,
      });

      alert("Cadastro realizado com sucesso!");
      setEhCadastro(false);
    } catch (erro) {
      console.error("Erro ao cadastrar:", erro);
      setErro(erro.response?.data?.message || "Erro ao cadastrar");
    }
  };
  return (
    <div className={estilos.paginaAuth}>

      <div className={estilos.linhasDecorativas}>
        <div className={estilos.linhasSuperior}></div>
        <div className={estilos.linhasInferior}></div>
      </div>
      <div className={estilos.container}>
        <div className={estilos.ladoMarca}>
          <div className={`${estilos.conteudoMarca} ${estilos.conteudoMarcaMobile}`}>
            <Logo />
            <h1 className={estilos.titulo}>SKEDOU</h1>
            <div className={estilos.linhaTitulo}></div>
          </div>
        </div>

        <div className={estilos.ladoFormulario}>
          <div className={estilos.containerFormulario}>
            <div className={estilos.containerAnimado}>
              <div
                className={estilos.formsWrapper}
                style={{
                  transform: ehCadastro ? "translateX(-50%)" : "translateX(0%)",
                }}
              >
                <div className={estilos.areaFormulario}>
                  <FormularioLogin
                    dadosLogin={dadosLogin}
                    aoMudarInput={aoMudarLogin}
                    aoEnviar={aoEnviarLogin}
                    erro={erro}
                  />
                  <div className={estilos.linkAlternar}>
                    <p className={estilos.textoAlternar}>Não tem uma conta?</p>
                    <button
                      onClick={alternarModo}
                      className={estilos.botaoAlternar}
                    >
                      Cadastre-se aqui
                    </button>
                  </div>
                </div>

                <div className={estilos.areaFormulario}>
                  <FormularioCadastro
                    dadosCadastro={dadosCadastro}
                    aoMudarInput={aoMudarCadastro}
                    aoEnviar={aoEnviarCadastro}
                    erro={ehCadastro ? erro : ""}
                  />
                  <div className={estilos.linkAlternar}>
                    <p className={estilos.textoAlternar}>Já tem uma conta?</p>
                    <button
                      onClick={alternarModo}
                      className={estilos.botaoAlternar}
                    >
                      Faça login aqui
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default Autenticacao;
