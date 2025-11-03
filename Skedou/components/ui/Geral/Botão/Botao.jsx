import estilos from './Botao.module.css';

const Botao = ({
  children,
  tipo = 'button',
  aoClicar,
  desabilitado = false,
  variacao = 'primario',
  tamanho = 'medio'
}) => {

  const aoClicarBotao = (evento) => {
    if(desabilitado) return;
    if(aoClicar) aoClicar(evento);
  };

  const classeBotao = `
    ${estilos.botao}
    ${estilos[variacao]} 
    ${estilos[tamanho]}
    ${desabilitado ? estilos.desabilitado: ''}`.trim();

  return (
    <button
      type={tipo}
      className={classeBotao}
      onClick={aoClicarBotao}
      disabled={desabilitado}
    >
      {children}
    </button>
  );
};

export default Botao;