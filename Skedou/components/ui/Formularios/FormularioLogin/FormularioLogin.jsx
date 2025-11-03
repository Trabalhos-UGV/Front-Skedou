import Botao from "../../Geral/Botão/Botao.jsx";
import CampoTexto from "../../Geral/CampoTexto/Input.jsx";
import estilos from "./FormularioLogin.module.css";

const FormularioLogin = ({ dadosLogin, aoMudarInput, aoEnviar, erro = "" }) => {
  const aoEnviarFormulario = (evento) => {
    evento.preventDefault();
    aoEnviar();
  };

  return (
    <form className={estilos.formularioLogin} onSubmit={aoEnviarFormulario}>
      <div className={estilos.fundoFormulario}></div>

      <div className={estilos.conteudoFormulario}>
        <h2
          style={{
            color: "white",
            fontFamily: "Poppins, sans-serif",
            fontSize: "2rem",
            marginBottom: "20px",
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          Login
        </h2>

        <CampoTexto
          rotulo="Usuário"
          tipo="text"
          nome="usuario"
          id="usuario"
          valor={dadosLogin.usuario}
          aoMudar={aoMudarInput}
          placeholder="Digite seu usuário"
        />

        <CampoTexto
          rotulo="Senha"
          tipo="password"
          nome="senha"
          id="senha"
          valor={dadosLogin.senha}
          aoMudar={aoMudarInput}
          placeholder="Digite sua senha"
        />

        {erro && <div className={estilos.mensagemErro}>{erro}</div>}

        <Botao tipo="submit">Entrar</Botao>
      </div>
    </form>
  );
};

export default FormularioLogin;
