import React, { useState, useEffect } from "react";
import TabsCategorias from "../../components/ui/Geral/TabsCategorias/TabsCategorias";
import CardNegocio from "../../components/ui/Cards/CardNegocio/CardNegocio";
import { listarNegocios } from "../../services/negociosService";
import estilos from "./Inicio.module.css";

const Inicio = () => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Geral");
  const [negocios, setNegocios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarNegocios();
  }, [categoriaSelecionada]);

  const carregarNegocios = async () => {
    setCarregando(true);
    setErro("");
    try {
      const resposta = await listarNegocios(categoriaSelecionada);
      console.log("Resposta da API:", resposta);
      const lista = Array.isArray(resposta) ? resposta : [];
      console.log("Lista de empresas:", lista);
      const negociosMapeados = lista.map((item) => {
        const emp = item.empresa; 

        return {
          id: emp.codigo,
          nome: emp.nome,
          categoria: obterNomeCategoria(emp.categoria),
          descricao: emp.descricao,
          horario: formatarHorario(emp.horarios),
          dono: emp.usuario?.nome || "Desconhecido",
          avaliacao: emp.avaliacao || 0,
          avaliacoes: emp.totalAvaliacoes || 0,
          endereco: emp.endereco?.rua || "Não informado",
          telefone: emp.telefone || "Não informado",
          imagem: emp.imagem || "/assets/placeholder.png",
        };
      });

      console.log("Negócios mapeados:", negociosMapeados);
      setNegocios(negociosMapeados);
    } catch (erro) {
      console.error("Erro ao carregar negócios:", erro);
      setErro("Erro ao carregar negócios");
      setNegocios([]);
    } finally {
      setCarregando(false);
    }
  };

  const obterNomeCategoria = (numCategoria) => {
    const categorias = { 
      1: "Mecânica", 
      2: "Cabeleireiro", 
      3: "Manicure" 
    };
    return categorias[numCategoria] || "Outros";
  };

  const formatarHorario = (horarios) => {
    if (!horarios || horarios.length === 0) return "Consultar horário";

    const abertoHoje = horarios.find((h) => h.aberto);
    if (!abertoHoje) return "Fechado";

    return `${abertoHoje.horario_abertura.substring(0, 5)} às ${abertoHoje.horario_fechamento.substring(0, 5)}`;
  };

  const negociosFiltrados = negocios;

  return (
    <div className={estilos.container}>
      <h1 className={estilos.titulo}>Tipos de Agendamento</h1>

      <TabsCategorias
        categorias={["Geral", "Mecânica", "Manicure", "Cabeleireiro"]}
        selecionada={categoriaSelecionada}
        aoSelecionar={setCategoriaSelecionada}
      />

      {carregando ? (
        <div className={estilos.carregando}>Carregando negócios...</div>
      ) : erro ? (
        <div className={estilos.erro}>{erro}</div>
      ) : negociosFiltrados.length === 0 ? (
        <div className={estilos.vazio}>
          Nenhum negócio encontrado nesta categoria
        </div>
      ) : (
        <div className={estilos.listaCards}>
          {negociosFiltrados.map((n) => (
            <CardNegocio key={n.id} negocio={n} />
          ))}
        </div>
      )}

      <div className={estilos.marcaDagua}>S</div>
    </div>
  );
};

export default Inicio;