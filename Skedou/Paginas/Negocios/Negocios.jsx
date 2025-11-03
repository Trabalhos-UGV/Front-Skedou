import React, { useState, useEffect } from "react";
import TabsCategorias from "../../components/ui/Geral/TabsCategorias/TabsCategorias";
import Modal from "../../components/ui/Geral/Modal/Modal";
import { useAuth } from "../../context/AuthContext";
import FormularioNegocio from "../../components/ui/Formularios/FormularioNegocio/FormularioNegocio";
import FormularioServico from "../../components/ui/Formularios/FormularioServico/FormularioServico";
import CardServico from "../../components/ui/Cards/CardServico/CardServico";
import CardSolicitacao from "../../components/ui/Cards/CardSolicitacao/CardSolicitacao";
import Botao from "../../components/ui/Geral/Botão/Botao";
import { Plus } from "lucide-react";
import {
  obterMeuNegocio,
  cadastrarNegocio,
  atualizarNegocio,
} from "../../services/negociosService";
import {
  listarServicos,
  cadastrarServico,
} from "../../services/servicosService";
import { listarSolicitacoesRecebidas } from "../../services/agendamentosService";
import estilos from "./Negocios.module.css";

const Negocios = () => {
  const { usuario } = useAuth();
  const [abaSelecionada, setAbaSelecionada] = useState("Meu Negócio");
  const [modalNegocioAberto, setModalNegocioAberto] = useState(false);
  const [modalServicoAberto, setModalServicoAberto] = useState(false);
  const [negocioEditando, setNegocioEditando] = useState(null);
  const [negocios, setNegocios] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarDados();
  }, [abaSelecionada]);

  const carregarDados = async () => {
    setCarregando(true);
    try {
      const respNegocio = await obterMeuNegocio(usuario.id);
      console.log("📦 Retorno da API:", respNegocio);

      const lista = Array.isArray(respNegocio)
        ? respNegocio.map((item) => item.empresa)
        : [];

      setNegocios(lista);

      if (lista.length > 0 && abaSelecionada === "Serviços") {
        const respServicos = await listarServicos(lista[0].codigo);
        setServicos(respServicos.servicos || []);
      }

      if (lista.length > 0 && abaSelecionada === "Solicitações") {
        const respSolicitacoes = await listarSolicitacoesRecebidas();
        setSolicitacoes(respSolicitacoes.agendamentos || []);
      }
    } catch (erro) {
      console.error("Erro ao carregar dados:", erro);
      setNegocios([]);
    } finally {
      setCarregando(false);
    }
  };

  const aoSalvarNegocio = async (dados) => {
    try {
      if (negocioEditando) {
        console.log("🔄 Modo: ATUALIZAR negócio", negocioEditando.codigo);
        await atualizarNegocio(negocioEditando.codigo, dados);
      } 
      else {
        console.log("➕ Modo: CADASTRAR novo negócio");
        await cadastrarNegocio(dados);
      }
      
      setModalNegocioAberto(false);
      setNegocioEditando(null);
      carregarDados();
      alert("Negócio salvo com sucesso!");
    } catch (erro) {
      console.error("Erro ao salvar negócio:", erro);
      const mensagemErro = erro.response?.data?.message || 
                          erro.response?.data?.erro || 
                          "Erro ao salvar negócio";
      alert(mensagemErro);
    }
  };

  const abrirModalEdicao = (negocio) => {
    setNegocioEditando(negocio);
    setModalNegocioAberto(true);
  };

  const abrirModalCadastro = () => {
    setNegocioEditando(null);
    setModalNegocioAberto(true);
  };

  const aoSalvarServico = async (dados) => {
    try {
      if (negocios.length === 0) return;
      await cadastrarServico(negocios[0].codigo, dados);
      setModalServicoAberto(false);
      carregarDados();
    } catch (erro) {
      console.error("Erro ao salvar serviço:", erro);
      alert("Erro ao salvar serviço");
    }
  };

  const obterNomeCategoria = (numCategoria) => {
    const categorias = { 1: "Mecânica", 2: "Cabeleireiro", 3: "Manicure" };
    return categorias[numCategoria] || "Outros";
  };

  return (
    <div className={estilos.container}>
      <h1 className={estilos.titulo}>Gerenciar Negócio</h1>

      <TabsCategorias
        categorias={["Meu Negócio", "Serviços", "Solicitações"]}
        selecionada={abaSelecionada}
        aoSelecionar={setAbaSelecionada}
      />

      {carregando ? (
        <div className={estilos.carregando}>Carregando...</div>
      ) : abaSelecionada === "Meu Negócio" ? (
        <div className={estilos.conteudo}>
          <div className={estilos.conteudo}>
            {negocios.length > 0 ? (
              <>
                <div className={estilos.headerNegocios}>
                  <h2 className={estilos.subtitulo}>Meus Negócios</h2>
                  <Botao
                    variacao="primario"
                    tamanho="medio"
                    aoClicar={abrirModalCadastro}
                  >
                    <Plus size={16} />
                    Novo Negócio
                  </Botao>
                </div>

                {negocios.map((negocio) => (
                  <div key={negocio.codigo} className={estilos.cardNegocio}>
                    <h2 className={estilos.subtitulo}>{negocio.nome}</h2>

                    <div className={estilos.infoGrid}>
                      <div className={estilos.infoItem}>
                        <span className={estilos.label}>Categoria:</span>
                        <span className={estilos.valor}>
                          {obterNomeCategoria(negocio.categoria)}
                        </span>
                      </div>
                      <div className={estilos.infoItem}>
                        <span className={estilos.label}>Descrição:</span>
                        <span className={estilos.valor}>
                          {negocio.descricao}
                        </span>
                      </div>

                      <div
                        className={`${estilos.infoItem} ${estilos.fullWidth}`}
                      >
                        <span className={estilos.label}>Horários:</span>
                        <ul className={estilos.horariosGrid}>
                          {negocio.horarios.map((dia, index) => (
                            <li key={index} className={estilos.horarioDia}>
                              <strong>{dia.dia}:</strong>{" "}
                              {dia.aberto
                                ? `${dia.horario_abertura} - ${dia.horario_fechamento}`
                                : "Fechado"}
                              {dia.fecha_meio_dia && " (fecha ao meio-dia)"}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className={estilos.acoes}>
                      <Botao
                        variacao="primario"
                        tamanho="medio"
                        aoClicar={() => abrirModalEdicao(negocio)}
                      >
                        Editar Negócio
                      </Botao>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className={estilos.semNegocio}>
                <p>Você ainda não cadastrou um negócio</p>
                <Botao
                  variacao="primario"
                  tamanho="grande"
                  aoClicar={abrirModalCadastro}
                >
                  Cadastrar Meu Negócio
                </Botao>
              </div>
            )}
          </div>
        </div>
      ) : abaSelecionada === "Serviços" ? (
        <div className={estilos.conteudo}>
          {negocios.length > 0 ? (
            <>
              <div className={estilos.headerServicos}>
                <h2 className={estilos.subtitulo}>Serviços Cadastrados</h2>
                <Botao
                  variacao="primario"
                  tamanho="medio"
                  aoClicar={() => setModalServicoAberto(true)}
                >
                  <Plus size={16} />
                  Novo Serviço
                </Botao>
              </div>

              {servicos.length > 0 ? (
                <div className={estilos.listaServicos}>
                  {servicos.map((servico) => (
                    <CardServico
                      key={servico.srv_cod}
                      servico={servico}
                      negocioId={negocios[0].codigo}
                      aoAtualizar={carregarDados}
                    />
                  ))}
                </div>
              ) : (
                <div className={estilos.vazio}>Nenhum serviço cadastrado</div>
              )}
            </>
          ) : (
            <div className={estilos.vazio}>Cadastre seu negócio primeiro</div>
          )}
        </div>
      ) : (
        <div className={estilos.conteudo}>
          {negocios.length > 0 ? (
            <>
              <h2 className={estilos.subtitulo}>Solicitações Recebidas</h2>
              {solicitacoes.length > 0 ? (
                <div className={estilos.listaSolicitacoes}>
                  {solicitacoes.map((solicitacao) => (
                    <CardSolicitacao
                      key={solicitacao.agd_cod}
                      solicitacao={solicitacao}
                      aoAtualizar={carregarDados}
                    />
                  ))}
                </div>
              ) : (
                <div className={estilos.vazio}>
                  Nenhuma solicitação recebida
                </div>
              )}
            </>
          ) : (
            <div className={estilos.vazio}>Cadastre seu negócio primeiro</div>
          )}
        </div>
      )}

      {/* Modal de Negócio */}
      <Modal
        aberto={modalNegocioAberto}
        aoFechar={() => {
          setModalNegocioAberto(false);
          setNegocioEditando(null);
        }}
        titulo={negocioEditando ? "Editar Negócio" : "Cadastrar Negócio"}
      >
        <FormularioNegocio
          aoSalvar={aoSalvarNegocio}
          negocioExistente={negocioEditando}
        />
      </Modal>
      <Modal
        aberto={modalServicoAberto}
        aoFechar={() => setModalServicoAberto(false)}
        titulo="Cadastrar Serviço"
      >
        <FormularioServico aoSalvar={aoSalvarServico} />
      </Modal>

      <div className={estilos.marcaDagua}>S</div>
    </div>
  );
};

export default Negocios;