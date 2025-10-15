import Botao from "../Botão/Botao";
import CampoTexto from "../CampoTexto/Input";
import estilos from './CadastroEmpresa.module.css'

const CadastroEmpresa = ({

}) => {
  return (
    <form
    className={estilos.formularioLogin}
    >

      <div className={estilos.fundoFormulario}></div>

      <div className={estilos.cconteudoFormulario}></div>

      <CampoTexto
         
          rotulo="Nome Empresa" 
          tipo="text"
          nome="empresa"
          id="empresa"
          placeholder="Digite o nome da empresa"
          />


      <CampoTexto
         
          rotulo="CNPJ empresa" 
          tipo="text"
          nome="cnpj"
          id="cnpj"
          placeholder="Digite o CNPJ"
          />


      <CampoTexto
         
          rotulo="Tipo de Empresa" 
          tipo="text"
          nome="tipo_empresa"
          id="tipo_empresa"
          placeholder="Digite o tipo da empresa"
          />

          <Botao>Entrar</Botao>
    </form>
  
);
};

export default CadastroEmpresa

