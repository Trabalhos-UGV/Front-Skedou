import React, { Children } from 'react';

const Input = ({
    children,
    tipo = 'text',
    desabilitado = false,
    variacao = 'primario',
    tamanho = 'medio'
}) => {
    //É pra definir estilo so que não fiz ainda
    const classeInput = `
        
    `

    return(
        <input type={tipo} name="input1" id="input1"   />
    );
}

export default Input;