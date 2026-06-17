import { Link } from "react-router-dom";

function FAQ() {
  const perguntas = [
    {
      pergunta: "Como faço para demonstrar interesse em um peludo?",
      resposta:
        "Você pode conhecer os animais disponíveis na Home e demonstrar interesse por um peludo. Depois, a equipe responsável acompanha o pedido com cuidado para garantir uma adoção segura.",
    },
    {
      pergunta: "Preciso fazer login para ver os animais?",
      resposta:
        "Não. A visualização dos peludos é pública. O login é usado apenas pela equipe responsável para gerenciar cadastros, pedidos e relatórios.",
    },
    {
      pergunta: "A adoção acontece automaticamente pelo site?",
      resposta:
        "Não. O site ajuda a organizar as informações, mas a adoção precisa passar por uma análise responsável antes de ser concluída.",
    },
    {
      pergunta: "O que devo pensar antes de adotar?",
      resposta:
        "Antes de adotar, pense no tempo disponível, espaço em casa, gastos com alimentação, vacinas, saúde, higiene e compromisso de longo prazo.",
    },
    {
      pergunta: "As feiras de adoção são presenciais?",
      resposta:
        "Sim. As feiras apresentadas no site são presenciais e ajudam visitantes a conhecerem peludos, tirarem dúvidas e conversarem com a equipe responsável.",
    },
    {
      pergunta: "Posso ajudar mesmo sem adotar?",
      resposta:
        "Sim. Você pode ajudar divulgando os animais, apoiando feiras de adoção, compartilhando campanhas ou participando de ações voluntárias.",
    },
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

      <main className="faq-simple-page">
        <section className="faq-simple-hero">
          <span>Dúvidas frequentes</span>

          <h1>Perguntas antes de adotar</h1>

          <p>
            Veja respostas rápidas sobre adoção responsável, cuidados com os
            peludos, feiras presenciais e formas de ajudar.
          </p>
        </section>

        <section className="faq-simple-box">
          {perguntas.map((item, index) => (
            <details
              className="faq-simple-item"
              key={item.pergunta}
              open={index === 0}
            >
              <summary>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.pergunta}</strong>
              </summary>

              <p>{item.resposta}</p>
            </details>
          ))}
        </section>

        <section className="faq-simple-final">
          <div>
            <h2>Ainda está em dúvida?</h2>
            <p>
              Conheça os peludos disponíveis ou veja o passo a passo da adoção
              responsável.
            </p>
          </div>

          <div>
            <a href="/#pets">Ver peludos</a>
            <Link to="/como-adotar">Como adotar</Link>
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

export default FAQ;
