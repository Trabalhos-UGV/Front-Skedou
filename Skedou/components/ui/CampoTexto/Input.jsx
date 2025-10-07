import React from "react";
import estilos from './Input.module.css'

const CampoTexto = ({
    rotulo, //o texto acima do input, label
    tipo = 'text', //tipo texto, padrao
    nome,//nome do campo, da pra usar em forms e etc
    id,// o id kkk
    valor,//valor atual do campo, sem nada por padrao
    aoMudar,//funcao executada quando o valor muda
    desabilitado = false,// se esta desabilitado, falso por padrao
    placeholder = '',//o texto que fica no campo, quando ele ta sem nada
    obrigatorio = false// por padrao o campo nao é obrigatorio
}) => {
    return (
        //faz a verificacao se existe ou nao um label(rotulo) caso nao existe, ele nao coloca nada
        <div className={estilos.grupoCampo}>
            {rotulo && (
                <label
                htmlFor={id}
                className={estilos.rotulo}
                >
                    {rotulo}
                </label>
            )}
            {/* é o textbox em si, aqui que ele monta e da sentido para todos os parametros/variaveis criadas anteriormente */}
            <input
            type={tipo}
            name={nome}
            id={id}
            value={valor}
            onChange={aoMudar}
            disabled={desabilitado}
            placeholder={placeholder}
            required={obrigatorio}
            className={estilos.campo}
            />
        </div>
    );
};

export default CampoTexto