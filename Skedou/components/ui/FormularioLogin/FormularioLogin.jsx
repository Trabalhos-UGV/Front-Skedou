import Botao from '../Botão/Botao.jsx';
import CampoTexto from '../CampoTexto/Input.jsx';

import estilos from './FormularioLogin.module.css';

const FormularioLogin = ({
  dadosLogin, // dados digtados, nesse caso (usuario e senha)
  aoMudarInput, //funcao q ativa qnd digita
  aoEnviar,  //qnd clica no "entrar"
  //carregando = false, //se ta carregando ou nao
  erro = '' //possivel mensagem de erro
}) => {
  const aoEnviarFormulario = (evento) => {
    //vi que este prevent default é muito importante, ele nao deixa a pagina recarregar, nao apagando o formulario
    //e é bom pra controlar o comportamento da pagina
    evento.preventDefault();

    //chama a funcao aoEnviar que foi passada com prop
    //essa funcao esta definida no componente login
    aoEnviar();
  };

  return (
    //o submit server para dar funcionalidade a duas opcoes, 
    //quando o user clica no botao passado pelo submit, ou quando o enter é pressionado
    <form
    className={estilos.fundoFormularioLogin}
    onSubmit={aoEnviarFormulario}
    >
      <div className={estilos.fundoFormulario}></div>

      <div className={estilos.conteudoFormulario}>

        <CampoTexto
          //aqui eu n vou explicar novamente, pois ele ta no input (../CampoTexto/Input.jsx) linha 4
          //ele esta utilizando input criado para utilizar no campo de usuario e senha
          rotulo="Usuário" 
          tipo="text"
          nome="usuario"
          id="usuario"
          valor={dadosLogin.usuario}
          aoMudar={aoMudarInput}
          //desabilitado={carregando}
          placeholder="Digite seu usuário"
          />

          <CampoTexto
          rotulo="Senha"
          tipo="password"
          nome="senha"
          id="senha"
          valor={dadosLogin.senha}
          aoMudar={aoMudarInput}
          //desabilitado={carregando}
          placeholder="Digite sua senha"
          />
          

          {/*
          aqui ele vai verificar se deu erro e mostrar a mensagem de erro passada pelo (erro)
          basicamente ele usa o && pra verificar, se a contem ou nao um erro 
          */} 
          {erro &&(
            <div className={estilos.mensagemErro}>
              {erro}
              </div>
              )}


              <Botao
                tipo="submit" // tipo submit, envia o formulario
                //desabilitado={carregando} //desabilita, durante o carregamento
                //carregando={carregando} //mostra um "simbolo?" de carregamento
                >
                  {/*
                  o texto muda, dependendo do estado
                  */}
                  {/*carregando ? 'Entrando...' : 'Entrar'*/}
              </Botao>
      </div>
    </form>
  );
};

export default FormularioLogin;