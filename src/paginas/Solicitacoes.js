import { useEffect, useState } from "react";

const API_PEDIDOS = "http://localhost:3001/api/pedidos";
const API_INTERESSADOS = "http://localhost:3001/api/interessados";
const API_PELUDOS = "http://localhost:3001/api/peludos";

const formularioInicial = {
  interessado_id: "",
  peludo_id: "",
  data_solicitacao: "",
  status: "Pendente",
  observacoes: "",
};

function Solicitacoes() {
  const [pedidos, setPedidos] = useState([]);
  const [interessados, setInteressados] = useState([]);
  const [peludos, setPeludos] = useState([]);
  const [formulario, setFormulario] = useState(formularioInicial);
  const [idEdicao, setIdEdicao] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const [busca, setBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("Todos");

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      setCarregando(true);
      setErro("");

      const respostaPedidos = await fetch(API_PEDIDOS);
      const respostaInteressados = await fetch(API_INTERESSADOS);
      const respostaPeludos = await fetch(API_PELUDOS);

      if (!respostaPedidos.ok) {
        throw new Error("Não foi possível carregar os pedidos.");
      }

      if (!respostaInteressados.ok) {
        throw new Error("Não foi possível carregar os interessados.");
      }

      if (!respostaPeludos.ok) {
        throw new Error("Não foi possível carregar os peludos.");
      }

      const dadosPedidos = await respostaPedidos.json();
      const dadosInteressados = await respostaInteressados.json();
      const dadosPeludos = await respostaPeludos.json();

      setPedidos(dadosPedidos);
      setInteressados(dadosInteressados);
      setPeludos(dadosPeludos);
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  function atualizarCampo(evento) {
    const { name, value } = evento.target;

    setFormulario((dadosAtuais) => ({
      ...dadosAtuais,
      [name]: value,
    }));
  }

  function limparFormulario() {
    setFormulario(formularioInicial);
    setIdEdicao(null);
    setMensagem("");
    setErro("");
  }

  function limparFiltros() {
    setBusca("");
    setStatusFiltro("Todos");
  }

  function buscarNomeInteressado(id) {
    const interessadoEncontrado = interessados.find(
      (interessado) => Number(interessado.id) === Number(id),
    );

    return interessadoEncontrado
      ? interessadoEncontrado.nome
      : "Interessado não encontrado";
  }

  function buscarEmailInteressado(id) {
    const interessadoEncontrado = interessados.find(
      (interessado) => Number(interessado.id) === Number(id),
    );

    return interessadoEncontrado ? interessadoEncontrado.email : "";
  }

  function buscarNomePeludo(id) {
    const peludoEncontrado = peludos.find(
      (peludo) => Number(peludo.id) === Number(id),
    );

    return peludoEncontrado ? peludoEncontrado.nome : "Peludo não encontrado";
  }

  function buscarTipoPeludo(id) {
    const peludoEncontrado = peludos.find(
      (peludo) => Number(peludo.id) === Number(id),
    );

    return peludoEncontrado ? peludoEncontrado.tipo : "";
  }

  function formatarDataParaInput(data) {
    if (!data) {
      return "";
    }

    return String(data).split("T")[0];
  }

  function formatarDataParaTela(data) {
    if (!data) {
      return "Sem data";
    }

    const dataFormatada = new Date(data);

    return dataFormatada.toLocaleDateString("pt-BR");
  }

  async function salvarPedido(evento) {
    evento.preventDefault();

    if (
      !formulario.interessado_id ||
      !formulario.peludo_id ||
      !formulario.data_solicitacao ||
      !formulario.status
    ) {
      setErro("Preencha interessado, peludo, data e status.");
      return;
    }

    try {
      setSalvando(true);
      setErro("");
      setMensagem("");

      const url = idEdicao ? `${API_PEDIDOS}/${idEdicao}` : API_PEDIDOS;
      const metodo = idEdicao ? "PUT" : "POST";

      const resposta = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formulario),
      });

      const dadosResposta = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        throw new Error(
          dadosResposta.mensagem || "Não foi possível salvar o pedido.",
        );
      }

      setMensagem(
        idEdicao
          ? "Pedido atualizado com sucesso!"
          : "Pedido cadastrado com sucesso!",
      );

      setFormulario(formularioInicial);
      setIdEdicao(null);

      await carregarDados();
    } catch (error) {
      setErro(error.message);
    } finally {
      setSalvando(false);
    }
  }

  function editarPedido(pedido) {
    setIdEdicao(pedido.id);

    setFormulario({
      interessado_id: pedido.interessado_id || "",
      peludo_id: pedido.peludo_id || "",
      data_solicitacao: formatarDataParaInput(pedido.data_solicitacao),
      status: pedido.status || "Pendente",
      observacoes: pedido.observacoes || "",
    });

    setMensagem("");
    setErro("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function excluirPedido(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este pedido de adoção?",
    );

    if (!confirmar) {
      return;
    }

    try {
      setErro("");
      setMensagem("");

      const resposta = await fetch(`${API_PEDIDOS}/${id}`, {
        method: "DELETE",
      });

      const dadosResposta = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        throw new Error(
          dadosResposta.mensagem || "Não foi possível excluir o pedido.",
        );
      }

      if (idEdicao === id) {
        limparFormulario();
      }

      setMensagem("Pedido excluído com sucesso!");
      await carregarDados();
    } catch (error) {
      setErro(error.message);
    }
  }

  const pedidosFiltrados = pedidos.filter((pedido) => {
    const textoBusca = busca.trim().toLowerCase();

    const nomeInteressado = buscarNomeInteressado(
      pedido.interessado_id,
    ).toLowerCase();

    const emailInteressado = buscarEmailInteressado(
      pedido.interessado_id,
    ).toLowerCase();

    const nomePeludo = buscarNomePeludo(pedido.peludo_id).toLowerCase();

    const tipoPeludo = buscarTipoPeludo(pedido.peludo_id).toLowerCase();

    const observacoes = (pedido.observacoes || "").toLowerCase();

    const combinaBusca =
      textoBusca === "" ||
      nomeInteressado.includes(textoBusca) ||
      emailInteressado.includes(textoBusca) ||
      nomePeludo.includes(textoBusca) ||
      tipoPeludo.includes(textoBusca) ||
      observacoes.includes(textoBusca);

    const combinaStatus =
      statusFiltro === "Todos" || pedido.status === statusFiltro;

    return combinaBusca && combinaStatus;
  });

  const statusDisponiveis = [
    "Todos",
    "Pendente",
    "Em análise",
    "Aprovada",
    "Finalizada",
    "Recusada",
  ];

  return (
    <section className="crud-admin-page">
      <div className="crud-admin-header">
        <div>
          <h1>Solicitações de Adoção</h1>
          <p>
            Registre e acompanhe os pedidos que relacionam interessados aos
            peludos cadastrados.
          </p>
        </div>

        <button type="button" onClick={carregarDados}>
          Atualizar lista
        </button>
      </div>

      {mensagem && <div className="crud-alerta sucesso">{mensagem}</div>}
      {erro && <div className="crud-alerta erro">{erro}</div>}

      <div className="crud-admin-grid">
        <form className="crud-form-card" onSubmit={salvarPedido}>
          <div className="crud-form-title">
            <span>{idEdicao ? "Editando pedido" : "Novo pedido"}</span>
            <h2>{idEdicao ? "Editar solicitação" : "Cadastrar solicitação"}</h2>
          </div>

          <label>
            Interessado
            <select
              name="interessado_id"
              value={formulario.interessado_id}
              onChange={atualizarCampo}
            >
              <option value="">Selecione um interessado</option>

              {interessados.map((interessado) => (
                <option key={interessado.id} value={interessado.id}>
                  {interessado.nome}
                </option>
              ))}
            </select>
          </label>

          <label>
            Peludo
            <select
              name="peludo_id"
              value={formulario.peludo_id}
              onChange={atualizarCampo}
            >
              <option value="">Selecione um peludo</option>

              {peludos.map((peludo) => (
                <option key={peludo.id} value={peludo.id}>
                  {peludo.nome} - {peludo.tipo}
                </option>
              ))}
            </select>
          </label>

          <label>
            Data da solicitação
            <input
              type="date"
              name="data_solicitacao"
              value={formulario.data_solicitacao}
              onChange={atualizarCampo}
            />
          </label>

          <label>
            Status
            <select
              name="status"
              value={formulario.status}
              onChange={atualizarCampo}
            >
              <option value="Pendente">Pendente</option>
              <option value="Em análise">Em análise</option>
              <option value="Aprovada">Aprovada</option>
              <option value="Finalizada">Finalizada</option>
              <option value="Recusada">Recusada</option>
            </select>
          </label>

          <label>
            Observações
            <textarea
              name="observacoes"
              value={formulario.observacoes}
              onChange={atualizarCampo}
              placeholder="Ex: Interessado demonstrou afinidade com o peludo"
              rows="4"
            />
          </label>

          <div className="crud-form-actions">
            <button type="submit" disabled={salvando}>
              {salvando
                ? "Salvando..."
                : idEdicao
                  ? "Salvar alterações"
                  : "Cadastrar solicitação"}
            </button>

            {idEdicao && (
              <button
                type="button"
                className="secundario"
                onClick={limparFormulario}
              >
                Cancelar edição
              </button>
            )}
          </div>
        </form>

        <div className="crud-list-card">
          <div className="crud-list-title">
            <div>
              <span>Registros do banco</span>
              <h2>Pedidos cadastrados</h2>
            </div>

            <strong>
              {pedidosFiltrados.length} de {pedidos.length} registros
            </strong>
          </div>

          <div className="solicitacoes-admin-filtros">
            <input
              type="text"
              placeholder="Buscar por interessado, e-mail, peludo ou observação"
              value={busca}
              onChange={(evento) => setBusca(evento.target.value)}
            />

            <select
              value={statusFiltro}
              onChange={(evento) => setStatusFiltro(evento.target.value)}
            >
              {statusDisponiveis.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="btn-buscar-peludo"
              onClick={limparFiltros}
            >
              Limpar filtros
            </button>
          </div>

          {carregando ? (
            <div className="crud-vazio">Carregando pedidos...</div>
          ) : pedidosFiltrados.length === 0 ? (
            <div className="crud-vazio">
              Nenhum pedido encontrado para os filtros selecionados.
            </div>
          ) : (
            <div className="crud-table-wrapper">
              <table className="crud-table solicitacoes-table">
                <thead>
                  <tr>
                    <th>Interessado</th>
                    <th>Peludo</th>
                    <th>Data</th>
                    <th>Status</th>
                    <th>Observações</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {pedidosFiltrados.map((pedido) => (
                    <tr key={pedido.id}>
                      <td>
                        <div className="pedido-cell">
                          <strong>
                            {buscarNomeInteressado(pedido.interessado_id)}
                          </strong>
                          <span>
                            {buscarEmailInteressado(pedido.interessado_id)}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div className="pedido-cell">
                          <strong>{buscarNomePeludo(pedido.peludo_id)}</strong>
                          <span>{buscarTipoPeludo(pedido.peludo_id)}</span>
                        </div>
                      </td>

                      <td>{formatarDataParaTela(pedido.data_solicitacao)}</td>

                      <td>
                        <span className="crud-status">{pedido.status}</span>
                      </td>

                      <td>
                        <div className="observacao-cell">
                          {pedido.observacoes || "Sem observações"}
                        </div>
                      </td>

                      <td>
                        <div className="crud-acoes">
                          <button
                            type="button"
                            onClick={() => editarPedido(pedido)}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            className="excluir"
                            onClick={() => excluirPedido(pedido.id)}
                          >
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Solicitacoes;
