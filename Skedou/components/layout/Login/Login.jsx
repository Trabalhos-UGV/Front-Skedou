import React, { useState } from 'react';
import FormularioLogin from '../../componentes/ui/FormularioLogin/FormularioLogin';
import LogoEmpresa from '../../componentes/ui/LogoEmpresa/LogoEmpresa';
import { servicoAuth } from '../../servicos/servicoAuth';
import estilos from './Login.module.css';
const Login = () => {
  const [dadosLogin, setDadosLogin] = useState({
    usuario: '',  
    senha: ''    
  });
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const aoMudarInput = (evento) => {
    const { name, value } = evento.target;
    setDadosLogin(dadosAnteriores => ({
      ...dadosAnteriores,  
      [name]: value        
    }));
    if (erro) {
      setErro('');
    }
  };
  const aoFazerLogin = async () => {
    if (!dadosLogin.usuario || !dadosLogin.senha) {
      setErro('Por favor, preencha todos os campos');
      return; 
    }
    setCarregando(true);
    setErro('');
    try {
      const resultado = await servicoAuth.fazerLogin(dadosLogin);
      if (resultado.sucesso) {
        console.log('Login realizado com sucesso!', resultado);
        //alert('Bem-vindo, ' + resultado.usuario.nome);
        
      } else {
        setErro(resultado.mensagem || 'Usuário ou senha inválidos');
      }
    } catch (erro) {
      setErro('Erro ao conectar com o servidor');
      console.error('Erro no login:', erro);
      
    } finally {
      setCarregando(false);
    }
  };
  return (
    <div className={estilos.paginaLogin}>
      <div className={estilos.linhasDecorativas}>
        <div className={estilos.linhasSuperior}></div>
        <div className={estilos.linhasInferior}></div>
      </div>
      <div className={estilos.container}>
        <div className={estilos.ladoMarca}>
          <div className={estilos.conteudoMarca}>
            <LogoEmpresa />
            <h1 className={estilos.titulo}>SKEDOU</h1>
            <div className={estilos.linhaTitulo}></div>
          </div>
        </div>
        <div className={estilos.ladoFormulario}>
          <FormularioLogin
            dadosLogin={dadosLogin}       
            aoMudarInput={aoMudarInput}    
            aoEnviar={aoFazerLogin}         
            carregando={carregando}         
            erro={erro}                     
          />
        </div>
        
      </div>
    </div>
  );
};
export default Login;