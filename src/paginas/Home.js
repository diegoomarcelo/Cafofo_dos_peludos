import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slidesBanner = [
  {
    icone: "🐶",
    titulo: "Encontre pets disponíveis",
    texto: "Veja animais cadastrados esperando por uma nova família.",
    imagem: "/img/Mel.png",
    posicao: "center 38%",
  },
  {
    icone: "💛",
    titulo: "Adoção com cuidado",
    texto: "Conecte interessados e peludos de forma mais organizada.",
    imagem: "/img/Rosa.png",
    posicao: "center 34%",
  },
  {
    icone: "📋",
    titulo: "Pedidos acompanhados",
    texto: "O sistema ajuda a registrar interessados, pedidos e relatórios.",
    imagem: "/img/alex.png",
    posicao: "center 30%",
  },
];

function Home() {
  const pets = [
    {
      nome: "Mel",
      imagem: "/img/Mel.png",
      local: "Brasília, DF",
      detalhe: "Fêmea • Pequeno porte",
    },
    {
      nome: "Bob",
      imagem: "/img/bob.png",
      local: "Brasília, DF",
      detalhe: "Macho • Brincalhão",
    },
    {
      nome: "Rosa",
      imagem: "/img/Rosa.png",
      local: "Brasília, DF",
      detalhe: "Fêmea • Dócil",
    },
    {
      nome: "Alex",
      imagem: "/img/alex.png",
      local: "Brasília, DF",
      detalhe: "Macho • Companheiro",
    },
    {
      nome: "Will",
      imagem: "/img/Will.png",
      local: "Brasília, DF",
      detalhe: "Macho • Carinhoso",
    },
    {
      nome: "Leo",
      imagem: "/img/Leo.png",
      local: "Brasília, DF",
      detalhe: "Macho • Esperto",
    },
    {
      nome: "Maya",
      imagem: "/img/chavosa.png",
      local: "Brasília, DF",
      detalhe: "Fêmea • Alegre",
    },
    {
      nome: "João",
      imagem: "/img/Joao.png",
      local: "Brasília, DF",
      detalhe: "Macho • Dócil",
    },
    {
      nome: "Luna",
      imagem: "/img/marias.png",
      local: "Brasília, DF",
      detalhe: "Fêmea • Companheira",
    },
    {
      nome: "Tobias",
      imagem: "/img/melo.png",
      local: "Brasília, DF",
      detalhe: "Macho • Protetor",
    },
  ];

  const [indiceBanner, setIndiceBanner] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceBanner((indiceAtual) =>
        indiceAtual === slidesBanner.length - 1 ? 0 : indiceAtual + 1,
      );
    }, 4500);

    return () => clearInterval(intervalo);
  }, []);

  const slideBanner = slidesBanner[indiceBanner];

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

      <main className="home-final">
        <section className="banner-final" id="inicio">
          <div className="banner-final-texto">
            <span>Adoção responsável</span>

            <h1>Todo peludo merece um lar cheio de carinho.</h1>

            <p>
              Conheça animais disponíveis para adoção e ajude um peludo a
              encontrar uma nova família.
            </p>

            <div className="banner-final-botoes">
              <a href="#pets">Ver peludos</a>
              <Link to="/como-adotar">Como funciona</Link>
            </div>
          </div>

          <div className="banner-final-imagem">
            <img
              key={slideBanner.titulo}
              src={slideBanner.imagem}
              alt={slideBanner.titulo}
              style={{ objectPosition: slideBanner.posicao }}
            />

            <div className="banner-final-legenda">
              <strong>
                {slideBanner.icone} {slideBanner.titulo}
              </strong>
              <p>{slideBanner.texto}</p>
            </div>

            <div className="banner-final-pontos">
              {slidesBanner.map((slide, index) => (
                <button
                  type="button"
                  key={slide.titulo}
                  className={index === indiceBanner ? "ativo" : ""}
                  onClick={() => setIndiceBanner(index)}
                  aria-label={`Ver slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="botoes-amigo">
          <a href="#pets">Quero adotar</a>
          <Link to="/como-adotar">Como funciona a adoção</Link>
        </section>

        <section className="pets-vitrine" id="pets">
          <div className="pets-vitrine-topo">
            <div>
              <h2>Encontre seu mais novo amigo aqui!</h2>
              <p>
                Nosso site está cheio de doguinhos e gatinhos ansiosos por uma
                família. Vem ver!
              </p>
            </div>

            <div className="pets-vitrine-filtros">
              <span>Mais recentes</span>
              <span>Mais antigos</span>
              <span>Mais vistos</span>
              <span>Menos vistos</span>
            </div>
          </div>

          <div className="pets-vitrine-grid">
            {pets.map((pet) => (
              <article className="pet-vitrine-card" key={pet.nome}>
                <img src={pet.imagem} alt={`Foto de ${pet.nome}`} />

                <div>
                  <h3>{pet.nome}</h3>
                  <p>{pet.local}</p>
                  <span>{pet.detalhe}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="pets-vitrine-botao">
            <Link to="/como-adotar">Entender processo de adoção</Link>
          </div>
        </section>

        <section className="motivos-final" id="adocao">
          <h2>Por que adotar?</h2>

          <div className="motivos-grid-final">
            <div>
              <span>🐶</span>
              <p>
                <strong>Nesse exato momento,</strong> existem peludos esperando
                por uma família para chamar de sua.
              </p>
            </div>

            <div>
              <span>💛</span>
              <p>
                <strong>Não há recompensa maior</strong> do que ver um animal
                recebendo cuidado, carinho e segurança.
              </p>
            </div>

            <div>
              <span>🏠</span>
              <p>
                <strong>A adoção muda destinos:</strong> você oferece um lar e
                transforma a vida de um animal.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer-site" id="sobre">
        <div className="footer-content">
          <div>
            <img src="/img/logo1.png" alt="Cafofo dos Peludos" />
            <p>
              O Cafofo dos Peludos conecta animais, interessados e pedidos de
              adoção em um sistema simples e organizado.
            </p>
          </div>

          <div>
            <h4>Institucional</h4>
            <span>Sobre o projeto</span>
            <span>Adoção responsável</span>
            <span>Histórias de adoção</span>
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
            <span>Relatórios</span>
          </div>
        </div>

        <div className="footer-bottom">
          <strong>Cafofo dos Peludos</strong>
          <span>Sistema de gerenciamento de adoções</span>
        </div>
      </footer>
    </div>
  );
}

export default Home;
