import { Link } from "react-router-dom";

function ComoAdotar() {
  const etapas = [
    {
      numero: "01",
      titulo: "Conheça o animal",
      texto:
        "Antes de demonstrar interesse, observe as informações do peludo, como porte, idade, comportamento e necessidades de cuidado.",
    },
    {
      numero: "02",
      titulo: "Avalie sua rotina",
      texto:
        "Pense se você tem tempo, espaço, condição financeira e disposição para cuidar do animal todos os dias.",
    },
    {
      numero: "03",
      titulo: "Passe pela análise",
      texto:
        "A equipe responsável analisa o interesse para garantir que a adoção seja segura para o peludo e para a família.",
    },
    {
      numero: "04",
      titulo: "Adoção responsável",
      texto:
        "Após a aprovação, o animal pode ir para o novo lar, com compromisso de cuidado, proteção e carinho.",
    },
  ];

  const checklist = [
    "Tenho tempo para cuidar",
    "Tenho espaço seguro",
    "Consigo manter alimentação e saúde",
    "Entendo que adoção é compromisso",
  ];

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

      <main className="adotar-guia-page">
        <section className="adotar-guia-hero">
          <div className="adotar-guia-texto">
            <span>Guia de adoção</span>

            <h1>Antes de adotar, entenda o compromisso.</h1>

            <p>
              A adoção responsável não é apenas escolher um animal. É avaliar se
              existe preparo para oferecer cuidado, segurança, tempo e afeto
              durante toda a vida do peludo.
            </p>
          </div>

          <aside className="adotar-guia-checklist">
            <h2>Antes de decidir</h2>

            <ul>
              {checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="adotar-guia-processo">
          <div className="adotar-guia-topo">
            <span>Processo</span>
            <h2>Como funciona?</h2>
            <p>
              O processo ajuda a organizar o interesse de adoção e evita que a
              decisão seja feita por impulso.
            </p>
          </div>

          <div className="adotar-guia-linha">
            {etapas.map((etapa) => (
              <article className="adotar-guia-etapa" key={etapa.numero}>
                <strong>{etapa.numero}</strong>

                <div>
                  <h3>{etapa.titulo}</h3>
                  <p>{etapa.texto}</p>
                </div>
              </article>
            ))}
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

export default ComoAdotar;
