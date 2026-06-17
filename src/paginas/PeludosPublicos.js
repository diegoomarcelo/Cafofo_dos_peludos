import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obterImagemPeludo } from "../utilitarios/storage";

const API_PELUDOS = "http://localhost:3001/api/peludos";
const API_INTERESSADOS = "http://localhost:3001/api/interessados";
const API_PEDIDOS = "http://localhost:3001/api/pedidos";

const detalhesVisuaisPeludos = {
  1: {
    sexo: "Fêmea",
    porte: "Pequeno",
    cidade: "Brasília - DF",
  },
  2: {
    sexo: "Macho",
    porte: "Médio",
    cidade: "Ceilândia - DF",
  },
  3: {
    sexo: "Fêmea",
    porte: "Pequeno",
    cidade: "Taguatinga - DF",
  },
  4: {
    sexo: "Macho",
    porte: "Grande",
    cidade: "Águas Claras - DF",
  },
  5: {
    sexo: "Fêmea",
    porte: "Pequeno",
    cidade: "Brasília - DF",
  },
  6: {
    sexo: "Fêmea",
    porte: "Médio",
    cidade: "Samambaia - DF",
  },
  7: {
    sexo: "Macho",
    porte: "Pequeno",
    cidade: "Guará - DF",
  },
  8: {
    sexo: "Fêmea",
    porte: "Pequeno",
    cidade: "Sobradinho - DF",
  },
  9: {
    sexo: "Macho",
    porte: "Grande",
    cidade: "Planaltina - DF",
  },
  10: {
    sexo: "Fêmea",
    porte: "Pequeno",
    cidade: "Brasília - DF",
  },
  11: {
    sexo: "Macho",
    porte: "Médio",
    cidade: "Ceilândia - DF",
  },
  12: {
    sexo: "Macho",
    porte: "Pequeno",
    cidade: "Taguatinga - DF",
  },
  13: {
    sexo: "Fêmea",
    porte: "Médio",
    cidade: "Águas Claras - DF",
  },
  14: {
    sexo: "Macho",
    porte: "Pequeno",
    cidade: "Guará - DF",
  },
  15: {
    sexo: "Macho",
    porte: "Grande",
    cidade: "Samambaia - DF",
  },
  16: {
    sexo: "Fêmea",
    porte: "Pequeno",
    cidade: "Brasília - DF",
  },
  17: {
    sexo: "Macho",
    porte: "Pequeno",
    cidade: "Sobradinho - DF",
  },
  18: {
    sexo: "Macho",
    porte: "Pequeno",
    cidade: "Planaltina - DF",
  },
  19: {
    sexo: "Fêmea",
    porte: "Médio",
    cidade: "Ceilândia - DF",
  },
  20: {
    sexo: "Macho",
    porte: "Pequeno",
    cidade: "Taguatinga - DF",
  },
};

function PeludosPublicos() {
  const [peludos, setPeludos] = useState([]);
  const [carregandoPeludos, setCarregandoPeludos] = useState(false);
  const [erroPeludos, setErroPeludos] = useState("");

  const [filtroEspecie, setFiltroEspecie] = useState("Todas");
  const [filtroSexo, setFiltroSexo] = useState("Todos");
  const [filtroPorte, setFiltroPorte] = useState("Todos");
  const [filtroCidade, setFiltroCidade] = useState("Todas");
  const [busca, setBusca] = useState("");

  const [filtrosAplicados, setFiltrosAplicados] = useState({
    especie: "Todas",
    sexo: "Todos",
    porte: "Todos",
    cidade: "Todas",
    busca: "",
  });

  const [peludoSelecionado, setPeludoSelecionado] = useState(null);
  const [nomeInteressado, setNomeInteressado] = useState("");
  const [emailInteressado, setEmailInteressado] = useState("");
  const [telefoneInteressado, setTelefoneInteressado] = useState("");
  const [cidadeInteressado, setCidadeInteressado] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [aviso, setAviso] = useState("");
  const [interesseEnviado, setInteresseEnviado] = useState(false);
  const [enviandoInteresse, setEnviandoInteresse] = useState(false);

  useEffect(() => {
    carregarPeludos();
  }, []);

  async function carregarPeludos() {
    try {
      setCarregandoPeludos(true);
      setErroPeludos("");

      const resposta = await fetch(API_PELUDOS);

      if (!resposta.ok) {
        throw new Error("Não foi possível carregar os peludos.");
      }

      const dados = await resposta.json();

      const peludosFormatados = dados.map((peludo) => {
        const detalhes = detalhesVisuaisPeludos[peludo.id] || {};

        return {
          id: peludo.id,
          nome: peludo.nome,
          especie: peludo.tipo || "Não informado",
          sexo: detalhes.sexo || "Não informado",
          porte: detalhes.porte || "Não informado",
          cidade: detalhes.cidade || "Distrito Federal",
          status: peludo.status || "Disponível",
          imagem: obterImagemPeludo(peludo.id),
          descricao: peludo.descricao || "",
          idade: peludo.idade || "",
        };
      });

      setPeludos(peludosFormatados);
    } catch (erro) {
      setErroPeludos(erro.message);
    } finally {
      setCarregandoPeludos(false);
    }
  }

  const cidades = ["Todas", ...new Set(peludos.map((peludo) => peludo.cidade))];

  const peludosFiltrados = peludos.filter((peludo) => {
    const combinaEspecie =
      filtrosAplicados.especie === "Todas" ||
      peludo.especie === filtrosAplicados.especie;

    const combinaSexo =
      filtrosAplicados.sexo === "Todos" ||
      peludo.sexo === filtrosAplicados.sexo;

    const combinaPorte =
      filtrosAplicados.porte === "Todos" ||
      peludo.porte === filtrosAplicados.porte;

    const combinaCidade =
      filtrosAplicados.cidade === "Todas" ||
      peludo.cidade === filtrosAplicados.cidade;

    const combinaBusca = peludo.nome
      .toLowerCase()
      .includes(filtrosAplicados.busca.toLowerCase());

    return (
      combinaEspecie &&
      combinaSexo &&
      combinaPorte &&
      combinaCidade &&
      combinaBusca
    );
  });

  function buscarPeludos() {
    setFiltrosAplicados({
      especie: filtroEspecie,
      sexo: filtroSexo,
      porte: filtroPorte,
      cidade: filtroCidade,
      busca: busca.trim(),
    });
  }

  function abrirFormulario(peludo) {
    setPeludoSelecionado(peludo);
    setAviso("");
    setInteresseEnviado(false);
    setNomeInteressado("");
    setEmailInteressado("");
    setTelefoneInteressado("");
    setCidadeInteressado("");
    setMensagem("");
  }

  function fecharFormulario() {
    setPeludoSelecionado(null);
    setAviso("");
    setInteresseEnviado(false);
    setEnviandoInteresse(false);
  }

  async function enviarInteresse(event) {
    event.preventDefault();

    if (
      !nomeInteressado.trim() ||
      !emailInteressado.trim() ||
      !telefoneInteressado.trim() ||
      !cidadeInteressado.trim()
    ) {
      setAviso(
        "Preencha nome, e-mail, telefone e cidade para enviar o interesse."
      );
      return;
    }

    if (!emailInteressado.includes("@")) {
      setAviso("Digite um e-mail válido.");
      return;
    }

    try {
      setEnviandoInteresse(true);
      setAviso("");

      const dadosInteressado = {
        nome: nomeInteressado.trim(),
        email: emailInteressado.trim(),
        telefone: telefoneInteressado.trim(),
        cidade: cidadeInteressado.trim(),
        endereco: "",
        perfil_adocao: mensagem.trim(),
      };

      const respostaInteressado = await fetch(API_INTERESSADOS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosInteressado),
      });

      const interessadoCriado = await respostaInteressado.json();

      if (!respostaInteressado.ok) {
        throw new Error(
          interessadoCriado.mensagem ||
            "Não foi possível cadastrar o interessado."
        );
      }

      const dadosPedido = {
        interessado_id: interessadoCriado.id,
        peludo_id: peludoSelecionado.id,
        data_solicitacao: new Date().toISOString().split("T")[0],
        status: "Pendente",
        observacoes:
          mensagem.trim() ||
          `Interessado demonstrou interesse pelo ${peludoSelecionado.nome} no catálogo público.`,
      };

      const respostaPedido = await fetch(API_PEDIDOS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosPedido),
      });

      const pedidoCriado = await respostaPedido.json();

      if (!respostaPedido.ok) {
        throw new Error(
          pedidoCriado.mensagem || "Não foi possível cadastrar a solicitação."
        );
      }

      setAviso("Interesse enviado com sucesso! A equipe entrará em contato.");
      setNomeInteressado("");
      setEmailInteressado("");
      setTelefoneInteressado("");
      setCidadeInteressado("");
      setMensagem("");
      setInteresseEnviado(true);
    } catch (erro) {
      setAviso(erro.message);
    } finally {
      setEnviandoInteresse(false);
    }
  }

  return (
    <div className="site-wrapper">
      <header className="home-public-header">
        <div className="home-header-container">
          <Link to="/" className="home-logo">
            <img src="/img/logo1.png" alt="Cafofo dos Peludos" />
          </Link>

          <nav className="home-menu">
            <Link to="/">Início</Link>
            <Link to="/peludos">Peludos</Link>
            <Link to="/como-adotar">Como adotar</Link>
            <Link to="/feiras">Feiras</Link>
            <Link to="/faq">FAQ</Link>
          </nav>

          <div className="home-header-actions">
            <Link to="/peludos" className="btn-home-adotar">
              Quero adotar
            </Link>

            <Link to="/login" className="btn-home-entrar">
              Portal
            </Link>
          </div>
        </div>
      </header>

      <main className="peludos-publicos-page">
        <section className="peludos-publicos-topo">
          <span>Peludos disponíveis</span>

          <h1>Encontre seu novo amigo</h1>

          <p>
            Conheça cães e gatos disponíveis para adoção responsável. Use os
            filtros para encontrar um peludo que combine com sua rotina.
          </p>
        </section>

        <section className="peludos-filtros">
          <select
            value={filtroEspecie}
            onChange={(event) => setFiltroEspecie(event.target.value)}
          >
            <option value="Todas">Todas as espécies</option>
            <option value="Cachorro">Cachorros</option>
            <option value="Gato">Gatos</option>
          </select>

          <select
            value={filtroSexo}
            onChange={(event) => setFiltroSexo(event.target.value)}
          >
            <option value="Todos">Todos os sexos</option>
            <option value="Macho">Machos</option>
            <option value="Fêmea">Fêmeas</option>
            <option value="Não informado">Não informado</option>
          </select>

          <select
            value={filtroPorte}
            onChange={(event) => setFiltroPorte(event.target.value)}
          >
            <option value="Todos">Todos os portes</option>
            <option value="Pequeno">Pequeno</option>
            <option value="Médio">Médio</option>
            <option value="Grande">Grande</option>
            <option value="Não informado">Não informado</option>
          </select>

          <select
            value={filtroCidade}
            onChange={(event) => setFiltroCidade(event.target.value)}
          >
            {cidades.map((cidade) => (
              <option key={cidade} value={cidade}>
                {cidade}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Nome do peludo"
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
          />

          <button
            type="button"
            className="btn-buscar-peludo"
            onClick={buscarPeludos}
          >
            Buscar
          </button>
        </section>

        <section className="peludos-lista-topo">
          <div>
            <h2>Peludos para adoção</h2>

            {carregandoPeludos ? (
              <p>Carregando peludos cadastrados...</p>
            ) : (
              <p>{peludosFiltrados.length} peludo(s) encontrado(s).</p>
            )}
          </div>
        </section>

        {erroPeludos && <div className="interesse-aviso">{erroPeludos}</div>}

        <section className="peludos-publicos-grid">
          {!carregandoPeludos &&
            peludosFiltrados.map((peludo) => (
              <article className="peludo-publico-card" key={peludo.id}>
                <div className="peludo-publico-imagem">
                  <img src={peludo.imagem} alt={peludo.nome} />

                  <span>{peludo.status}</span>
                </div>

                <div className="peludo-publico-conteudo">
                  <h3>{peludo.nome}</h3>

                  <p>
                    {peludo.especie} • {peludo.sexo} • {peludo.porte}
                  </p>

                  <small>{peludo.cidade}</small>

                  {peludo.idade && <small>Idade: {peludo.idade}</small>}

                  {peludo.descricao && <p>{peludo.descricao}</p>}

                  <button type="button" onClick={() => abrirFormulario(peludo)}>
                    Tenho interesse
                  </button>
                </div>
              </article>
            ))}
        </section>
      </main>

      <footer className="footer-site">
        <div className="footer-content">
          <div>
            <img src="/img/logo1.png" alt="Cafofo dos Peludos" />
            <p>
              O Cafofo dos Peludos ajuda a conectar animais que precisam de um
              lar a pessoas dispostas a adotar com responsabilidade.
            </p>
          </div>

          <div>
            <h4>Institucional</h4>
            <span>Sobre o projeto</span>
            <span>Adoção responsável</span>
            <span>Dúvidas frequentes</span>
          </div>

          <div>
            <h4>Como ajudar?</h4>
            <span>Quero adotar</span>
            <span>Feiras de adoção</span>
            <span>Adoção responsável</span>
          </div>

          <div>
            <h4>Acesso</h4>
            <span>Login da equipe</span>
            <span>Área administrativa</span>
            <span>Gerenciamento interno</span>
          </div>
        </div>

        <div className="footer-bottom">
          <strong>Cafofo dos Peludos</strong>
          <span>Adoção responsável e cuidado com quem precisa de um lar</span>
        </div>
      </footer>

      {peludoSelecionado && (
        <div className="interesse-modal-fundo">
          <section className="interesse-modal">
            <button
              type="button"
              className="interesse-fechar"
              onClick={fecharFormulario}
            >
              ×
            </button>

            <div className="interesse-modal-topo">
              <img
                src={peludoSelecionado.imagem}
                alt={peludoSelecionado.nome}
              />

              <div>
                <span>Interesse de adoção</span>
                <h2>{peludoSelecionado.nome}</h2>
                <p>
                  {peludoSelecionado.especie} • {peludoSelecionado.sexo} •{" "}
                  {peludoSelecionado.porte}
                </p>
              </div>
            </div>

            {aviso && <div className="interesse-aviso">{aviso}</div>}

            {!interesseEnviado && (
              <form onSubmit={enviarInteresse} className="interesse-form">
                <div>
                  <label>Nome completo</label>
                  <input
                    type="text"
                    value={nomeInteressado}
                    onChange={(event) =>
                      setNomeInteressado(event.target.value)
                    }
                    placeholder="Digite seu nome"
                  />
                </div>

                <div>
                  <label>E-mail</label>
                  <input
                    type="email"
                    value={emailInteressado}
                    onChange={(event) =>
                      setEmailInteressado(event.target.value)
                    }
                    placeholder="Digite seu e-mail"
                  />
                </div>

                <div>
                  <label>Telefone</label>
                  <input
                    type="text"
                    value={telefoneInteressado}
                    onChange={(event) =>
                      setTelefoneInteressado(event.target.value)
                    }
                    placeholder="Digite seu telefone"
                  />
                </div>

                <div>
                  <label>Cidade</label>
                  <input
                    type="text"
                    value={cidadeInteressado}
                    onChange={(event) =>
                      setCidadeInteressado(event.target.value)
                    }
                    placeholder="Digite sua cidade"
                  />
                </div>

                <div>
                  <label>Mensagem</label>
                  <textarea
                    value={mensagem}
                    onChange={(event) => setMensagem(event.target.value)}
                    placeholder="Conte brevemente por que deseja adotar"
                  />
                </div>

                <button type="submit" disabled={enviandoInteresse}>
                  {enviandoInteresse ? "Enviando..." : "Enviar interesse"}
                </button>
              </form>
            )}

            {interesseEnviado && (
              <button
                type="button"
                className="interesse-botao-fechar"
                onClick={fecharFormulario}
              >
                Fechar
              </button>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default PeludosPublicos;