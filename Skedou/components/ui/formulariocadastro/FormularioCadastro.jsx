import React, { useState } from "react";
import Botao from "../Botão/Botao";
import CampoTexto from "../CampoTexto/Input";
import estilos from "../FormularioLogin/FormularioLogin.module.css";

const FormularioCadastro = ({
  dadosCadastro,
  aoMudarInput,
  aoEnviar,
  erro = "",
}) => {
  const [etapa, setEtapa] = useState(1);
  const [senhaSegura, setSenhaSegura] = useState("");
  const avancarEtapa = (evento) => {
    evento.preventDefault();
    if (etapa < 3) setEtapa(etapa + 1);
  };

  const voltarEtapa = (evento) => {
    evento.preventDefault();
    if (etapa > 1) setEtapa(etapa - 1);
  };
  const validarSenha = (senha) => {
    let score = 0;
    if (senha.length >= 8) score++;
    if (/[A-Z]/.test(senha)) score++;
    if (/[0-9]/.test(senha)) score++;
    if (/[^A-Za-z0-9]/.test(senha)) score++;

    if (score <= 1) return "Fraca";
    if (score === 2) return "Média";
    return "Forte";
  };

  const aoMudarSenha = (e) => {
    aoMudarInput(e);
    setSenhaSegura(validarSenha(e.target.value));
  };
  const formatarCpfCnpj = (valor) => {
    const apenasNumeros = valor.replace(/\D/g, "");
    if (apenasNumeros.length <= 11) {
      return apenasNumeros
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      return apenasNumeros
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }
  };

  const aoMudarCpfCnpj = (e) => {
    const valorFormatado = formatarCpfCnpj(e.target.value);
    aoMudarInput({ target: { name: e.target.name, value: valorFormatado } });
  };

  const aoEnviarFormulario = (evento) => {
    evento.preventDefault();
    if (etapa === 3) aoEnviar();
    else avancarEtapa(evento);
  };

  const renderizarEtapa = () => {
    switch (etapa) {
      case 1:
        return (
          <>
            <CampoTexto
              rotulo="Nome Completo"
              tipo="text"
              nome="nomeCompleto"
              id="nomeCompleto"
              valor={dadosCadastro.nomeCompleto || ""}
              aoMudar={aoMudarInput}
              placeholder="Seu nome completo"
            />
            <CampoTexto
              rotulo="Como gostaria de ser chamado?"
              tipo="text"
              nome="apelido"
              id="apelido"
              valor={dadosCadastro.apelido || ""}
              aoMudar={aoMudarInput}
              placeholder="Ex: Thiago, Rafa..."
            />
          </>
        );
      case 2:
        return (
          <>
            <CampoTexto
              rotulo="CPF ou CNPJ"
              tipo="text"
              nome="cpfCnpj"
              id="cpfCnpj"
              valor={dadosCadastro.cpfCnpj || ""}
              aoMudar={aoMudarCpfCnpj}
              placeholder="Digite seu CPF ou CNPJ"
              maxLength={18}
            />

            <CampoTexto
              rotulo="Telefone"
              tipo="text"
              nome="telefone"
              id="telefone"
              valor={dadosCadastro.telefone || ""}
              aoMudar={(e) => {
                const valor = e.target.value.replace(/\D/g, "").slice(0, 11);
                const formatado = valor
                  .replace(/^(\d{2})(\d)/g, "($1) $2")
                  .replace(/(\d{5})(\d)/, "$1-$2");
                aoMudarInput({
                  target: { name: "telefone", value: formatado },
                });
              }}
              placeholder="(47) 99999-9999"
              maxLength={15}
            />
          </>
        );

      case 3:
        return (
          <>
            <CampoTexto
              rotulo="E-mail"
              tipo="email"
              nome="email"
              id="email"
              valor={dadosCadastro.email}
              aoMudar={aoMudarInput}
              placeholder="seu@email.com"
            />

            <CampoTexto
              rotulo="Senha"
              tipo="password"
              nome="senha"
              id="senha-cadastro"
              valor={dadosCadastro.senha}
              aoMudar={aoMudarSenha}
              placeholder="Crie uma senha"
            />
            {dadosCadastro.senha && (
              <div
                style={{
                  width: "60%",
                  marginTop: "2px",
                  alignSelf: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "5px",
                    background: "rgba(255,255,255,0.15)",
                    borderRadius: "6px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width:
                        senhaSegura === "Fraca"
                          ? "25%"
                          : senhaSegura === "Média"
                          ? "60%"
                          : senhaSegura === "Forte"
                          ? "100%"
                          : "0%",
                      background:
                        senhaSegura === "Fraca"
                          ? "linear-gradient(90deg, #ff3b3b, #ff6b6b)"
                          : senhaSegura === "Média"
                          ? "linear-gradient(90deg, #ffcc00, #ffe680)"
                          : "linear-gradient(90deg, #00ffa3, #00cfff)",
                      borderRadius: "6px",
                      transition: "width 0.4s ease, background 0.3s ease",
                      boxShadow:
                        senhaSegura === "Forte"
                          ? "0 0 6px rgba(0,255,163,0.3)"
                          : senhaSegura === "Média"
                          ? "0 0 4px rgba(255,204,0,0.25)"
                          : "0 0 3px rgba(255,75,75,0.25)",
                    }}
                  ></div>
                </div>

                <p
                  style={{
                    color: "rgba(255,255,255,0.75)",
                    fontSize: "0.75rem",
                    marginTop: "3px",
                    textAlign: "center",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {senhaSegura === "Fraca"
                    ? "Senha fraca"
                    : senhaSegura === "Média"
                    ? "Senha média"
                    : senhaSegura === "Forte"
                    ? "Senha forte"
                    : ""}
                </p>
              </div>
            )}

            <CampoTexto
              rotulo="Confirmar Senha"
              tipo="password"
              nome="confirmarSenha"
              id="confirmarSenha"
              valor={dadosCadastro.confirmarSenha}
              aoMudar={aoMudarInput}
              placeholder="Confirme sua senha"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <form className={estilos.formularioLogin} onSubmit={aoEnviarFormulario}>
      <div className={estilos.fundoFormulario}></div>

      <div className={estilos.conteudoFormulario}>
        <h2
          style={{
            color: "white",
            fontFamily: "Poppins, sans-serif",
            fontSize: "2rem",
            marginBottom: "20px",
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          Cadastro - Etapa {etapa}/3
        </h2>

        {renderizarEtapa()}

        {erro && <div className={estilos.mensagemErro}>{erro}</div>}

        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          {etapa > 1 && (
            <Botao tipo="button" aoClicar={voltarEtapa}>
              Voltar
            </Botao>
          )}
          <Botao tipo="submit">{etapa < 3 ? "Próximo" : "Cadastrar"}</Botao>
        </div>
      </div>
    </form>
  );
};

export default FormularioCadastro;
