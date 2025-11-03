import React, { useState, useEffect } from "react";
import Botao from "../../Geral/Botão/Botao";
import estilos from "./FormularioNegocio.module.css";
import { useAuth } from "../../../../context/AuthContext";

const diasSemana = [
  "segunda",
  "terca",
  "quarta",
  "quinta",
  "sexta",
  "sabado",
  "domingo",
];

const FormularioNegocio = ({ aoSalvar, negocioExistente }) => {
  const { usuario } = useAuth();
  const [dados, setDados] = useState({
    nome: "",
    categoria: "2",
    descricao: "",
    endereco: "",
    telefone: "",
  });

  const [horarios, setHorarios] = useState({
    segunda: {
      aberto: true,
      abertura: "08:00",
      fechamento: "18:00",
      fecha_meio_dia: false,
    },
    terca: {
      aberto: true,
      abertura: "08:00",
      fechamento: "18:00",
      fecha_meio_dia: false,
    },
    quarta: {
      aberto: true,
      abertura: "08:00",
      fechamento: "18:00",
      fecha_meio_dia: false,
    },
    quinta: {
      aberto: true,
      abertura: "08:00",
      fechamento: "18:00",
      fecha_meio_dia: false,
    },
    sexta: {
      aberto: true,
      abertura: "08:00",
      fechamento: "18:00",
      fecha_meio_dia: false,
    },
    sabado: {
      aberto: true,
      abertura: "08:00",
      fechamento: "12:00",
      fecha_meio_dia: true,
    },
    domingo: {
      aberto: false,
      abertura: "",
      fechamento: "",
      fecha_meio_dia: false,
    },
  });

  useEffect(() => {
    if (negocioExistente) {
      setDados({
        nome: negocioExistente.emp_nom || "",
        categoria: negocioExistente.emp_cat?.toString() || "1",
        descricao: negocioExistente.emp_dsc || "",
        endereco: negocioExistente.endereco || "",
        telefone: negocioExistente.telefone || "",
      });

      if (negocioExistente.horarios) {
        const horariosConvertidos = Array.isArray(negocioExistente.horarios)
          ? negocioExistente.horarios.reduce((acc, h) => {
              const chave = h.dia.toLowerCase();
              acc[chave] = {
                aberto: h.aberto,
                abertura: h.horario_abertura?.slice(0, 5) || "",
                fechamento: h.horario_fechamento?.slice(0, 5) || "",
                fecha_meio_dia: h.fecha_meio_dia || false,
              };
              return acc;
            }, {})
          : negocioExistente.horarios;

        setHorarios((prev) => ({ ...prev, ...horariosConvertidos }));
      }
    }
  }, [negocioExistente]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (!dados.nome.trim()) {
        //alert("O nome do estabelecimento é obrigatório");
        return;
      }

      if (!dados.telefone.trim()) {
        //alert("O telefone é obrigatório");
        return;
      }
      const horariosArray = Object.entries(horarios).map(([dia, info]) => ({
        dia: dia.charAt(0).toUpperCase() + dia.slice(1),
        aberto: info.aberto,
        horario_abertura: info.aberto && info.abertura 
          ? `${info.abertura}:00` 
          : null,
        horario_fechamento: info.aberto && info.fechamento 
          ? `${info.fechamento}:00` 
          : null,
        fecha_meio_dia: info.fecha_meio_dia || false,
      }));

      const dadosCompletos = {
        emp_nom: dados.nome.trim(),
        emp_usr: usuario.id,
        emp_cat: parseInt(dados.categoria),
        emp_dsc: dados.descricao.trim() || "",
        emp_cnpj: usuario?.cpfCnpj || "00000000000000",
        email: usuario?.email || "",
        telefone: dados.telefone.replace(/\D/g, ""),
        endereco: {
          rua: dados.endereco.trim() || "",
        },
        horarios: horariosArray,
      };

      console.log("📤 Enviando dados para API:", dadosCompletos);

      // Chama função de salvar passada por props
      await aoSalvar(dadosCompletos);
      
    } catch (erro) {
      console.error(" Erro no submit:", erro);
      //alert("Erro ao salvar negócio. Verifique os dados e tente novamente.");
    }
  };

  const handleChange = (e) => {
    setDados({ ...dados, [e.target.name]: e.target.value });
  };

  const handleHorarioChange = (dia, campo, valor) => {
    setHorarios({
      ...horarios,
      [dia]: {
        ...horarios[dia],
        [campo]: valor,
      },
    });
  };

  return (
    <form className={estilos.formulario} onSubmit={handleSubmit}>
      <div className={estilos.linha}>
        <div className={estilos.campo}>
          <label className={estilos.label}>Nome do estabelecimento *</label>
          <input
            type="text"
            name="nome"
            value={dados.nome}
            onChange={handleChange}
            className={estilos.input}
            required
          />
        </div>

        <div className={estilos.campo}>
          <label className={estilos.label}>Categoria *</label>
          <select
            name="categoria"
            value={dados.categoria}
            onChange={handleChange}
            className={estilos.input}
            required
          >
            <option value="1">Mecânica</option>
            <option value="2">Cabeleireiro</option>
            <option value="3">Manicure</option>
          </select>
        </div>
      </div>

      <div className={estilos.campo}>
        <label className={estilos.label}>Descrição</label>
        <textarea
          name="descricao"
          value={dados.descricao}
          onChange={handleChange}
          className={estilos.textarea}
          rows="4"
        />
      </div>

      <div className={estilos.linha}>
        <div className={estilos.campo}>
          <label className={estilos.label}>Endereço</label>
          <input
            type="text"
            name="endereco"
            value={dados.endereco}
            onChange={handleChange}
            className={estilos.input}
          />
        </div>

        <div className={estilos.campo}>
          <label className={estilos.label}>Telefone *</label>
          <input
            type="tel"
            name="telefone"
            value={dados.telefone}
            onChange={handleChange}
            className={estilos.input}
            placeholder="(00) 00000-0000"
            required
          />
        </div>
      </div>

      <div className={estilos.secaoHorarios}>
        <h3 className={estilos.tituloSecao}>Horários de Funcionamento</h3>

        {diasSemana.map((dia) => (
          <div key={dia} className={estilos.linhaHorario}>
            <div className={estilos.checkboxContainer}>
              <input
                type="checkbox"
                id={`aberto-${dia}`}
                checked={horarios[dia].aberto}
                onChange={(e) =>
                  handleHorarioChange(dia, "aberto", e.target.checked)
                }
                className={estilos.checkbox}
              />
              <label htmlFor={`aberto-${dia}`} className={estilos.labelDia}>
                {dia.charAt(0).toUpperCase() + dia.slice(1)}
              </label>
            </div>

            {horarios[dia].aberto && (
              <>
                <input
                  type="time"
                  value={horarios[dia].abertura}
                  onChange={(e) =>
                    handleHorarioChange(dia, "abertura", e.target.value)
                  }
                  className={estilos.inputHorario}
                  required
                />
                <span className={estilos.separador}>às</span>
                <input
                  type="time"
                  value={horarios[dia].fechamento}
                  onChange={(e) =>
                    handleHorarioChange(dia, "fechamento", e.target.value)
                  }
                  className={estilos.inputHorario}
                  required
                />

                <div className={estilos.checkboxContainer}>
                  <input
                    type="checkbox"
                    id={`meio-dia-${dia}`}
                    checked={horarios[dia].fecha_meio_dia}
                    onChange={(e) =>
                      handleHorarioChange(
                        dia,
                        "fecha_meio_dia",
                        e.target.checked
                      )
                    }
                    className={estilos.checkbox}
                  />
                  <label
                    htmlFor={`meio-dia-${dia}`}
                    className={estilos.labelMeioDia}
                  >
                    Fecha ao meio-dia
                  </label>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className={estilos.acoes}>
        <Botao tipo="submit" variacao="primario" tamanho="medio">
          Salvar Negócio
        </Botao>
      </div>
    </form>
  );
};

export default FormularioNegocio;