import React, { useState } from "react";
import FormularioLogin from "../../components/ui/Formularios/FormularioLogin/FormularioLogin";
import FormularioCadastro from "../../components/ui/Formularios/FormularioCadastro/FormularioCadastro";
import Logo from "../../components/ui/Geral/Logo/Logo";
import {
  cadastrarUsuario,
  logarUsuario,
} from "../../services/autenticacaoService";
import { useAuth } from "../../context/AuthContext"; 
import estilos from "./Autenticacao.module.css";

const Autenticacao = () => {
  const { login } = useAuth(); 
  const [ehCadastro, setEhCadastro] = useState(false);
  const [dadosLogin, setDadosLogin] = useState({ usuario: "", senha: "" });
  const [dadosCadastro, setDadosCadastro] = useState({
    nomeCompleto: "",
    cpfCnpj: "",
    telefone: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

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

    setCarregando(true);
    try {
      const resposta = await logarUsuario({
        eml_end: dadosLogin.usuario,
        usr_sen: dadosLogin.senha,
      });

      const { usuario } = resposta;

      login({
        id: usuario.usr_cod,
        nome: usuario.usr_nom,
        cpfCnpj: usuario.usr_cpfcnpj,
        ativo: usuario.usr_atv,
        email: usuario.email.eml_end,
        emailCod: usuario.email.eml_cod,
        telefone: usuario.telefone.tel_num,
        telefoneCod: usuario.telefone.tel_cod,
      });

      alert(`Bem-vindo, ${usuario.usr_nom}!`);
    } catch (erro) {
      console.error("Erro ao logar:", erro);
      setErro(
        erro.response?.data?.message ||
          "Erro ao logar. Verifique suas credenciais."
      );
    } finally {
      setCarregando(false);
    }
  };

  const aoEnviarCadastro = async () => {
    const { nomeCompleto, cpfCnpj, telefone, email, senha, confirmarSenha } =
      dadosCadastro;

    if (
      !nomeCompleto ||
      !cpfCnpj ||
      !telefone ||
      !email ||
      !senha ||
      !confirmarSenha
    ) {
      setErro("Preencha todos os campos");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem");
      return;
    }

    setCarregando(true);
    try {
      await cadastrarUsuario({
        usr_nom: nomeCompleto,
        usr_cpfcnpj: cpfCnpj.replace(/\D/g, ""),
        eml_end: email,
        tel_num: telefone.replace(/\D/g, ""),
        usr_sen: senha,
      });

      alert("Cadastro realizado com sucesso! Faça login para continuar.");
      setEhCadastro(false);
      setDadosLogin({ usuario: email, senha: "" });
    } catch (erro) {
      console.error("Erro ao cadastrar:", erro);
      setErro(erro.response?.data?.message || "Erro ao cadastrar");
    } finally {
      setCarregando(false);
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
          <div className={estilos.conteudoMarca}>
            <Logo posicao="centralizado" />
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
                    carregando={carregando}
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
                    carregando={carregando}
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
