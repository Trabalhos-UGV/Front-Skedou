//imports padrao do react, e do estilo do botao
import React, { Children } from 'react';
import estilos from './Botao.module.css';


//declarando uma constante Botao, com arrow function(=>), então ela recebe um objeto com um tipo de "propriedade???""
const Botao = ({
  children,// tudo oq está dentro da tag
  tipo = 'button', //definindo que é um botão
  aoClicar,// aoClicar consulta se o usuário é valido por exemplo
  desabilitado = false,// habilita ou desabilita o botão
  carregando = false, //apos clicar, pode ser adicionado um icone de carregamento, sei la
  variacao = 'primario',// pode se mudar o estilo do botão, por padrão eesta utilizando o "primario'
  tamanho = 'medio'//controlar o tamanho
}) => {

  //logica do clique
  const aoClicarBotao = (evento) => {
    if(desabilitado || carregando) return; //verifica se nenhuma delas é verdadeira e retorna
    if(aoClicar) aoClicar(evento); //caso passe da etapa anterior, ele executa aoClicar
  };


  //aqui é pegado o css do botao, e transforma em objetos, tendo uma logica diferenciada, que faz com que as classes do css, se transformem no objeto "estilos", garantindo que as variações nem os tamanhos se misturem, sempre fique cada um com o seu estilo
  const classeBotao = `
    ${estilos.botao}
    ${estilos[variacao]} 
    ${estilos[tamanho]}
    ${desabilitado || carregando ? estilos.desabilitado: ''}`.trim();

  return (
    <button
      type={tipo}
      className={classeBotao}
      onClick={aoClicarBotao}
      disabled={desabilitado || carregando}
    >
      {carregando && <span className= {estilos.carregando}></span>}
      <span className={carregando ? estilos.textoCarregando : ''}>{children}
      </span>
    </button>
    );
};

export default Botao;