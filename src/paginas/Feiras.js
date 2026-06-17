import { useState } from "react";
import { Link } from "react-router-dom";

function Feiras() {
  const feiras = [
    {
      id: 1,
      data: "22/06",
      imagem: "/img/feira1.png",
      titulo: "Feira de Adoção no Parque da Cidade",
      descricao:
        "Evento presencial com animais disponíveis para adoção responsável e orientação da equipe.",
      local: "Parque da Cidade",
      cidade: "Brasília - DF",
      horario: "9h às 14h",
      status: "Confirmada",
    },
    {
      id: 2,
      data: "30/06",
      imagem: "/img/feira2.png",
      titulo: "Feira dos Peludos no Centro Comunitário",
      descricao:
        "Ação comunitária para aproximar visitantes, voluntários e animais que aguardam um novo lar.",
      local: "Centro Comunitário",
      cidade: "Ceilândia - DF",
      horario: "10h às 15h",
      status: "Em breve",
    },
    {
      id: 3,
      data: "06/07",
      imagem: "/img/feira3.png",
      titulo: "Ação de Adoção Responsável",
      descricao:
        "Feira presencial com foco em adoção consciente, conversa com a equipe e apoio aos interessados.",
      local: "Praça Central",
      cidade: "Taguatinga - DF",
      horario: "8h às 13h",
      status: "Inscrições abertas",
    },
    {
      id: 4,
      data: "13/07",
      imagem: "/img/feira4.png",
      titulo: "Encontro de Adoção e Voluntariado",
      descricao:
        "Encontro para divulgação de animais, orientação sobre adoção e participação de voluntários.",
      local: "Espaço Comunitário",
      cidade: "Águas Claras - DF",
      horario: "9h às 12h",
      status: "Planejada",
    },
  ];

  const [filtro, setFiltro] = useState("Todas");

  const feirasFiltradas =
    filtro === "Todas"
      ? feiras
      : feiras.filter((feira) => feira.status === filtro);

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

      <main className="feiras-site-page">
        <section className="feiras-site-topo">
          <span>Eventos presenciais</span>

          <h1>Feiras de adoção</h1>

          <p>
            Acompanhe as feiras e ações presenciais do Cafofo dos Peludos. Os
            eventos aproximam animais, visitantes, voluntários e pessoas
            interessadas em adoção responsável.
          </p>
        </section>

        <section className="feiras-site-controle">
          <div>
            <h2>Próximas feiras</h2>
            <p>Confira os eventos cadastrados pela equipe.</p>
          </div>

          <label>
            Filtrar:
            <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
              <option value="Todas">Todos os eventos</option>
              <option value="Confirmada">Confirmadas</option>
              <option value="Em breve">Em breve</option>
              <option value="Inscrições abertas">Inscrições abertas</option>
              <option value="Planejada">Planejadas</option>
            </select>
          </label>
        </section>

        <section className="feiras-site-grid">
          {feirasFiltradas.map((feira) => (
            <article className="feira-site-card" key={feira.id}>
              <div className="feira-site-imagem">
                <img src={feira.imagem} alt={feira.titulo} />

                <div className="feira-site-data">
                  <strong>{feira.data}</strong>
                  <span>Feira de adoção</span>
                </div>
              </div>

              <div className="feira-site-conteudo">
                <div className="feira-site-status">{feira.status}</div>

                <h3>{feira.titulo}</h3>

                <p>{feira.descricao}</p>

                <div className="feira-site-info">
                  <span>
                    <strong>Local:</strong> {feira.local}
                  </span>

                  <span>
                    <strong>Cidade:</strong> {feira.cidade}
                  </span>

                  <span>
                    <strong>Horário:</strong> {feira.horario}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="feiras-site-aviso">
          <h2>Antes de participar</h2>

          <div>
            <p>Leve um documento de identificação.</p>
            <p>Converse com a equipe antes de decidir pela adoção.</p>
            <p>A adoção deve ser feita com responsabilidade.</p>
          </div>
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
    </div>
  );
}

export default Feiras;
