import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CHAVES_STORAGE } from "../utilitarios/storage";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function entrarNoSistema(event) {
    event.preventDefault();

    const emailDigitado = email.trim();
    const senhaDigitada = senha.trim();

    if (!emailDigitado || !senhaDigitada) {
      setErro("Preencha o e-mail e a senha para continuar.");
      return;
    }

    if (!emailDigitado.includes("@")) {
      setErro("Digite um e-mail válido.");
      return;
    }

    if (emailDigitado !== "teste@cafofo.com" || senhaDigitada !== "123456") {
      setErro("E-mail ou senha incorretos.");
      return;
    }

    const usuarioTeste = {
      email: emailDigitado,
      nome: "Equipe Cafofo",
    };

    localStorage.setItem(
      CHAVES_STORAGE.USUARIO_LOGADO,
      JSON.stringify(usuarioTeste),
    );

    setErro("");
    navigate("/dashboard");
  }

  return (
    <main className="login-min-page">
      <div className="login-min-area">
        <Link to="/" className="login-voltar-site">
          ← Voltar para o site
        </Link>

        <section className="login-min-card">
          <Link to="/" className="login-min-logo">
            <img src="/img/logo1.png" alt="Cafofo dos Peludos" />
          </Link>

          <h1>Entrar no sistema</h1>

          <p>
            Área restrita para gerenciamento de peludos, interessados e pedidos
            de adoção.
          </p>

          <div className="login-dados-teste">
            <span>Acesso teste:</span>
            <strong>teste@cafofo.com</strong>
            <span>•</span>
            <strong>123456</strong>
          </div>

          {erro && (
            <div className="login-min-erro" role="alert">
              {erro}
            </div>
          )}

          <form onSubmit={entrarNoSistema}>
            <div className="login-min-campo">
              <label htmlFor="email">E-mail</label>

              <input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="mb-3 login-min-campo">
              <label htmlFor="senha">Senha</label>

              <input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
              />
            </div>

            <button type="submit">Entrar</button>
          </form>

          <small>Acesso permitido apenas para a equipe responsável.</small>
        </section>
      </div>
    </main>
  );
}

export default Login;
