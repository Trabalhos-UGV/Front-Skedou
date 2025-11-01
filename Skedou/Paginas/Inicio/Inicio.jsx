import React, { useState } from "react";
import LayoutGeral from "../../components/layout/LayoutGeral/LayoutGeral";
import TabsCategorias from "../../components/ui/TabsCategorias/TabsCategorias";
import CardNegocio from "../../components/ui/CardNegocio/CardNegocio";

import estilos from "./Inicio.module.css";

const Inicio = () => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Geral");

  const negocios = [
    {
      id: 1,
      nome: "Mecânica Auto Repair",
      categoria: "Mecânica",
      descricao: "Alinhamento • Troca de Óleo",
      avaliacao: 4.8,
      avaliacoes: 256,
      horario: "Seg – Sex: 08h às 18h",
      endereco: "Av. Brasil, 1234 – Centro",
      imagem: "/assets/auto_repair_logo.png",
    },
  ];

  return (
    <LayoutGeral>
      <div className={estilos.container}>
        <h1 className={estilos.titulo}>Tipos de Agendamento</h1>

        <TabsCategorias
          categorias={["Geral", "Mecânica", "Manicure", "Cabeleleiro"]}
          selecionada={categoriaSelecionada}
          aoSelecionar={setCategoriaSelecionada}
        />

        <div className={estilos.listaCards}>
          {negocios
            .filter((n) => n.categoria === categoriaSelecionada)
            .map((n) => (
              <CardNegocio key={n.id} negocio={n} />
            ))}
        </div>
      </div>
    </LayoutGeral>
  );
};

export default Inicio;
