import React, { useState } from "react";
import FormularioLogin from "../../components/ui/FormularioLogin/FormularioLogin";
import Logo from "../../components/ui/Logo/logo";
import estilos from "./Login.module.css";

const Login = () => {
  const [dadosLogin, setDadosLogin] = useState({
    usuario: "",
    senha: "",
  });

  const [erro, setErro] = useState("");

  const aoMudarInput = (evento) => {
    const { name, value } = evento.target;

    setDadosLogin((dadoAnteriores) => ({
      ...dadoAnteriores,
      [name]: value,
    }));

    if (erro) setErro("");
  };

  const aoFazerLogin = () => {
    if (!dadosLogin.usuario || !dadosLogin.senha) {
      setErro("Por favor, preencha todos os campos");
      return;
    }

    //setCarregando(true);
    alert("Login enviado: " + dadosLogin.usuario);
    //setErro('');

    //try catch futuro aqui...

    //setCarregando(false);
  };

  return (
    <div className={estilos.paginaLogin}>
      <div className={estilos.linhasDecorativas}>
        <div className={estilos.linhaSuperior}></div>

        <div className={estilos.linhasInferior}></div>
      </div>
      <div className={estilos.container}>
        <div className={estilos.ladoMarca}>
          <div className={estilos.conteudoMarca}>
            <Logo tamanho="grande" />
            <h1 className={estilos.titulo}>SKEDOU</h1>
            <div className={estilos.linhaTitulo}></div>
          </div>
        </div>
        <div className={estilos.ladoFormulario}>
          <FormularioLogin
            dadosLogin={dadosLogin}
            aoMudarInput={aoMudarInput}
            aoEnviar={aoFazerLogin}
            erro={erro}
          />
        </div>
      </div>
    </div>
  );
};
export default Login;
