import React, { useState } from "react";
import Botao from "../../Geral/Botão/Botao";
import estilos from "./FormularioServico.module.css";

const FormularioServico = ({ aoSalvar }) => {
  const [dados, setDados] = useState({
    nome: "",
    duracao: "",
    valor: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do serviço:", dados);
    aoSalvar();
  };

  const handleChange = (e) => {
    setDados({ ...dados, [e.target.name]: e.target.value });
  };

  return (
    <form className={estilos.formulario} onSubmit={handleSubmit}>
      <div className={estilos.campo}>
        <label className={estilos.label}>Nome do Serviço *</label>
        <input
          type="text"
          name="nome"
          value={dados.nome}
          onChange={handleChange}
          className={estilos.input}
          placeholder="Ex: Troca de Óleo"
          required
        />
      </div>

      <div className={estilos.linha}>
        <div className={estilos.campo}>
          <label className={estilos.label}>Duração (horas) *</label>
          <input
            type="number"
            name="duracao"
            value={dados.duracao}
            onChange={handleChange}
            className={estilos.input}
            placeholder="Ex: 2"
            step="0.5"
            min="0"
            required
          />
        </div>

        <div className={estilos.campo}>
          <label className={estilos.label}>Valor (R$)</label>
          <input
            type="text"
            name="valor"
            value={dados.valor}
            onChange={handleChange}
            className={estilos.input}
            placeholder="Ex: 150.00 ou Consultar"
          />
        </div>
      </div>

      <div className={estilos.acoes}>
        <Botao tipo="submit" variacao="primario" tamanho="medio">
          Salvar Serviço
        </Botao>
      </div>
    </form>
  );
};

export default FormularioServico;
