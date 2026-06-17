import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { obterImagemPeludo } from '../utilitarios/storage';

const API_RELATORIO = 'http://localhost:3001/api/relatorio';
const API_PELUDOS = 'http://localhost:3001/api/peludos';

function Dashboard() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [peludos, setPeludos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(() => {
    carregarDashboard();
  }, []);

  async function carregarDashboard() {
    try {
      setCarregando(true);
      setErro('');

      const respostaRelatorio = await fetch(API_RELATORIO);
      const respostaPeludos = await fetch(API_PELUDOS);

      if (!respostaRelatorio.ok) {
        throw new Error('Não foi possível carregar os dados do dashboard.');
      }

      if (!respostaPeludos.ok) {
        throw new Error('Não foi possível carregar os peludos.');
      }

      const dadosRelatorio = await respostaRelatorio.json();
      const dadosPeludos = await respostaPeludos.json();

      setSolicitacoes(dadosRelatorio);
      setPeludos(dadosPeludos);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  function buscarIdPeludo(solicitacao) {
    if (solicitacao.peludo_id) {
      return solicitacao.peludo_id;
    }

    const peludoEncontrado = peludos.find(
      (peludo) => peludo.nome === solicitacao.nome_peludo
    );

    return peludoEncontrado ? peludoEncontrado.id : null;
  }

  function obterImagemDaSolicitacao(solicitacao) {
    const idPeludo = buscarIdPeludo(solicitacao);

    if (idPeludo) {
      return obterImagemPeludo(idPeludo);
    }

    return '/img/peludos/peludo1.jpg';
  }

  function formatarStatus(status) {
    return status || 'Pendente';
  }

  const pendentes = solicitacoes.filter(
    (solicitacao) => solicitacao.status_pedido === 'Pendente'
  );

  const emAnalise = solicitacoes.filter(
    (solicitacao) => solicitacao.status_pedido === 'Em análise'
  );

  const aprovadas = solicitacoes.filter(
    (solicitacao) =>
      solicitacao.status_pedido === 'Aprovada' ||
      solicitacao.status_pedido === 'Aprovado' ||
      solicitacao.status_pedido === 'Finalizada' ||
      solicitacao.status_pedido === 'Finalizado'
  );

  const recentes = [...solicitacoes].slice(0, 6);

  return (
    <section className="cafofo-admin-dashboard">
      <div className="cafofo-dashboard-header">
        <div>
          <span>Portal administrativo</span>
          <h1>Dashboard</h1>
          <p>
            Acompanhe as solicitações de adoção e acesse rapidamente os módulos
            de gerenciamento.
          </p>
        </div>

        <div className="cafofo-dashboard-header-actions">
          <Link to="/solicitacoes">Solicitações</Link>
          <Link to="/pets">Peludos</Link>
        </div>
      </div>

      {erro && <div className="crud-alerta erro">{erro}</div>}

      <section className="cafofo-dashboard-metrics">
        <article>
          <span>Total</span>
          <strong>{solicitacoes.length}</strong>
          <p>Solicitações recebidas</p>
        </article>

        <article>
          <span>Pendentes</span>
          <strong>{pendentes.length}</strong>
          <p>Aguardando análise</p>
        </article>

        <article>
          <span>Em análise</span>
          <strong>{emAnalise.length}</strong>
          <p>Em acompanhamento</p>
        </article>

        <article>
          <span>Aprovadas</span>
          <strong>{aprovadas.length}</strong>
          <p>Pedidos concluídos</p>
        </article>
      </section>

      <section className="cafofo-dashboard-actions">
        <Link to="/pets">Gerenciar peludos</Link>
        <Link to="/tutores">Gerenciar interessados</Link>
        <Link to="/solicitacoes">Ver solicitações</Link>
        <Link to="/relatorio">Abrir relatório</Link>
      </section>

      <section className="cafofo-dashboard-table-card">
        <div className="cafofo-dashboard-table-title">
          <div>
            <span>Registros recentes</span>
            <h2>Solicitações de adoção</h2>
          </div>

          <Link to="/solicitacoes">Ver todas</Link>
        </div>

        {carregando ? (
          <div className="cafofo-dashboard-empty">
            <h3>Carregando solicitações...</h3>
            <p>Buscando os dados atualizados no banco.</p>
          </div>
        ) : recentes.length > 0 ? (
          <div className="cafofo-dashboard-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Peludo</th>
                  <th>Interessado</th>
                  <th>Telefone</th>
                  <th>Data</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {recentes.map((solicitacao) => (
                  <tr key={solicitacao.pedido_id}>
                    <td>
                      <div className="cafofo-dashboard-pet">
                        <img
                          src={obterImagemDaSolicitacao(solicitacao)}
                          alt={solicitacao.nome_peludo}
                        />

                        <strong>{solicitacao.nome_peludo}</strong>
                      </div>
                    </td>

                    <td>
                      <strong>{solicitacao.nome_interessado}</strong>
                      <small>{solicitacao.email_interessado}</small>
                    </td>

                    <td>{solicitacao.telefone_interessado}</td>

                    <td>{solicitacao.data_formatada}</td>

                    <td>
                      <span className="cafofo-dashboard-status">
                        {formatarStatus(solicitacao.status_pedido)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="cafofo-dashboard-empty">
            <h3>Nenhuma solicitação recebida.</h3>
            <p>
              Quando um visitante enviar interesse por um peludo, o registro
              aparecerá aqui.
            </p>
          </div>
        )}
      </section>
    </section>
  );
}

export default Dashboard;