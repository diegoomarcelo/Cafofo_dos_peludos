import { useEffect, useState } from "react";

const API_RELATORIO = "http://localhost:3001/api/relatorio";

function Relatorio() {
  const [relatorio, setRelatorio] = useState([]);
  const [busca, setBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("Todos");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarRelatorio();
  }, []);

  async function carregarRelatorio() {
    try {
      setCarregando(true);
      setErro("");

      const resposta = await fetch(API_RELATORIO);

      if (!resposta.ok) {
        throw new Error("Não foi possível carregar o relatório.");
      }

      const dados = await resposta.json();
      setRelatorio(dados);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  function limparFiltros() {
    setBusca("");
    setStatusFiltro("Todos");
  }

  const relatorioFiltrado = relatorio.filter((item) => {
    const textoBusca = busca.toLowerCase();

    const combinaBusca =
      item.nome_interessado.toLowerCase().includes(textoBusca) ||
      item.email_interessado.toLowerCase().includes(textoBusca) ||
      item.nome_peludo.toLowerCase().includes(textoBusca) ||
      item.tipo_peludo.toLowerCase().includes(textoBusca);

    const combinaStatus =
      statusFiltro === "Todos" || item.status_pedido === statusFiltro;

    return combinaBusca && combinaStatus;
  });

  const statusDisponiveis = [
    "Todos",
    ...new Set(relatorio.map((item) => item.status_pedido)),
  ];

  const totalPedidos = relatorio.length;

  const totalPendentes = relatorio.filter(
    (item) => item.status_pedido === "Pendente"
  ).length;

  const totalAnalise = relatorio.filter(
    (item) => item.status_pedido === "Em análise"
  ).length;

  const totalAprovados = relatorio.filter(
    (item) => item.status_pedido === "Aprovada"
  ).length;

  const totalFinalizados = relatorio.filter(
    (item) => item.status_pedido === "Finalizada"
  ).length;

  return (
    <section className="crud-admin-page">
      <div className="crud-admin-header">
        <div>
          <h1>Relatório de Adoções</h1>
          <p>
            Acompanhe os pedidos de adoção relacionando interessados, peludos,
            datas e status.
          </p>
        </div>

        <button type="button" onClick={carregarRelatorio}>
          Atualizar relatório
        </button>
      </div>

      {erro && <div className="crud-alerta erro">{erro}</div>}

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <span>Total de pedidos</span>
          <strong>{totalPedidos}</strong>
        </div>

        <div className="dashboard-card">
          <span>Pendentes</span>
          <strong>{totalPendentes}</strong>
        </div>

        <div className="dashboard-card">
          <span>Em análise</span>
          <strong>{totalAnalise}</strong>
        </div>

        <div className="dashboard-card">
          <span>Aprovadas</span>
          <strong>{totalAprovados}</strong>
        </div>

        <div className="dashboard-card">
          <span>Finalizadas</span>
          <strong>{totalFinalizados}</strong>
        </div>
      </div>

      <div className="crud-list-card">
        <div className="crud-list-title">
          <div>
            <span>Visão geral</span>
            <h2>Pedidos relacionados</h2>
          </div>

          <strong>{relatorioFiltrado.length} registro(s)</strong>
        </div>

        <div className="peludos-filtros">
          <input
            type="text"
            placeholder="Buscar por interessado, e-mail, peludo ou tipo"
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
          />

          <select
            value={statusFiltro}
            onChange={(event) => setStatusFiltro(event.target.value)}
          >
            {statusDisponiveis.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <button type="button" className="btn-buscar-peludo" onClick={limparFiltros}>
            Limpar filtros
          </button>
        </div>

        {carregando ? (
          <div className="crud-vazio">Carregando relatório...</div>
        ) : relatorioFiltrado.length === 0 ? (
          <div className="crud-vazio">
            Nenhum pedido encontrado para os filtros selecionados.
          </div>
        ) : (
          <div className="crud-table-wrapper">
            <table className="crud-table relatorio-table">
              <thead>
                <tr>
                  <th>Interessado</th>
                  <th>Peludo</th>
                  <th>Data</th>
                  <th>Status do pedido</th>
                  <th>Status do peludo</th>
                  <th>Observações</th>
                </tr>
              </thead>

              <tbody>
                {relatorioFiltrado.map((item) => (
                  <tr key={item.pedido_id}>
                    <td>
                      <div className="pedido-cell">
                        <strong>{item.nome_interessado}</strong>
                        <span>{item.email_interessado}</span>
                        <span>{item.telefone_interessado}</span>
                        <span>{item.cidade_interessado}</span>
                      </div>
                    </td>

                    <td>
                      <div className="pedido-cell">
                        <strong>{item.nome_peludo}</strong>
                        <span>{item.tipo_peludo}</span>
                        <span>Idade: {item.idade_peludo}</span>
                      </div>
                    </td>

                    <td>{item.data_formatada}</td>

                    <td>
                      <span className="crud-status">{item.status_pedido}</span>
                    </td>

                    <td>
                      <span className="crud-status">{item.status_peludo}</span>
                    </td>

                    <td>
                      <div className="observacao-cell">
                        {item.observacoes || "Sem observações"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default Relatorio;