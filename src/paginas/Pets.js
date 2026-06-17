import { useEffect, useRef, useState } from "react";
import {
  obterImagemPeludo,
  removerImagemPeludo,
  salvarImagemPeludo,
} from "../utilitarios/storage";

const API_PELUDOS = "http://localhost:3001/api/peludos";

const formularioInicial = {
  nome: "",
  tipo: "Cachorro",
  idade: "",
  descricao: "",
  status: "Disponível",
};

function Pets() {
  const [peludos, setPeludos] = useState([]);
  const [formulario, setFormulario] = useState(formularioInicial);
  const [idEdicao, setIdEdicao] = useState(null);
  const [imagemPreview, setImagemPreview] = useState("");
  const [imagemFoiAlterada, setImagemFoiAlterada] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const [busca, setBusca] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("Todos");
  const [statusFiltro, setStatusFiltro] = useState("Todos");

  const inputImagemRef = useRef(null);

  useEffect(() => {
    carregarPeludos();
  }, []);

  async function carregarPeludos() {
    try {
      setCarregando(true);
      setErro("");

      const resposta = await fetch(API_PELUDOS);

      if (!resposta.ok) {
        throw new Error("Não foi possível carregar os peludos.");
      }

      const dados = await resposta.json();

      setPeludos(dados);
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

  function selecionarImagem(evento) {
    const arquivo = evento.target.files[0];

    if (!arquivo) {
      return;
    }

    const leitor = new FileReader();

    leitor.onloadend = () => {
      setImagemPreview(leitor.result);
      setImagemFoiAlterada(true);
    };

    leitor.readAsDataURL(arquivo);
  }

  function limparFormulario() {
    setFormulario(formularioInicial);
    setIdEdicao(null);
    setImagemPreview("");
    setImagemFoiAlterada(false);

    if (inputImagemRef.current) {
      inputImagemRef.current.value = "";
    }
  }

  function limparFiltros() {
    setBusca("");
    setTipoFiltro("Todos");
    setStatusFiltro("Todos");
  }

  async function salvarPeludo(evento) {
    evento.preventDefault();

    if (
      !formulario.nome ||
      !formulario.tipo ||
      !formulario.idade ||
      !formulario.status
    ) {
      setErro("Preencha nome, tipo, idade e status.");
      return;
    }

    try {
      setSalvando(true);
      setErro("");
      setMensagem("");

      const url = idEdicao ? `${API_PELUDOS}/${idEdicao}` : API_PELUDOS;
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
          dadosResposta.mensagem || "Não foi possível salvar o peludo."
        );
      }

      const idParaImagem = idEdicao || dadosResposta.id;

      if (imagemFoiAlterada && imagemPreview && idParaImagem) {
        salvarImagemPeludo(idParaImagem, imagemPreview);
      }

      setMensagem(
        idEdicao
          ? "Peludo atualizado com sucesso!"
          : "Peludo cadastrado com sucesso!"
      );

      limparFormulario();
      await carregarPeludos();
    } catch (error) {
      setErro(error.message);
    } finally {
      setSalvando(false);
    }
  }

  function editarPeludo(peludo) {
    setIdEdicao(peludo.id);

    setFormulario({
      nome: peludo.nome || "",
      tipo: peludo.tipo || "Cachorro",
      idade: peludo.idade || "",
      descricao: peludo.descricao || "",
      status: peludo.status || "Disponível",
    });

    setImagemPreview(obterImagemPeludo(peludo.id));
    setImagemFoiAlterada(false);
    setMensagem("");
    setErro("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function excluirPeludo(id) {
    const confirmarExclusao = window.confirm(
      "Tem certeza que deseja excluir este peludo?"
    );

    if (!confirmarExclusao) {
      return;
    }

    try {
      setErro("");
      setMensagem("");

      const resposta = await fetch(`${API_PELUDOS}/${id}`, {
        method: "DELETE",
      });

      const dadosResposta = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        throw new Error(
          dadosResposta.mensagem || "Não foi possível excluir o peludo."
        );
      }

      removerImagemPeludo(id);

      if (idEdicao === id) {
        limparFormulario();
      }

      setMensagem("Peludo excluído com sucesso!");
      await carregarPeludos();
    } catch (error) {
      setErro(error.message);
    }
  }

  const peludosFiltrados = peludos.filter((peludo) => {
    const textoBusca = busca.trim().toLowerCase();

    const nome = (peludo.nome || "").toLowerCase();
    const tipo = (peludo.tipo || "").toLowerCase();
    const idade = (peludo.idade || "").toLowerCase();
    const descricao = (peludo.descricao || "").toLowerCase();
    const status = (peludo.status || "").toLowerCase();

    const combinaBusca =
      textoBusca === "" ||
      nome.includes(textoBusca) ||
      tipo.includes(textoBusca) ||
      idade.includes(textoBusca) ||
      descricao.includes(textoBusca) ||
      status.includes(textoBusca);

    const combinaTipo = tipoFiltro === "Todos" || peludo.tipo === tipoFiltro;

    const combinaStatus =
      statusFiltro === "Todos" || peludo.status === statusFiltro;

    return combinaBusca && combinaTipo && combinaStatus;
  });

  return (
    <section className="crud-admin-page">
      <div className="crud-admin-header">
        <div>
          <h1>Gestão de Peludos</h1>
          <p>
            Cadastre, edite, liste e exclua os peludos disponíveis para adoção.
          </p>
        </div>

        <button type="button" onClick={carregarPeludos}>
          Atualizar lista
        </button>
      </div>

      {mensagem && <div className="crud-alerta sucesso">{mensagem}</div>}
      {erro && <div className="crud-alerta erro">{erro}</div>}

      <div className="crud-admin-grid">
        <form className="crud-form-card" onSubmit={salvarPeludo}>
          <div className="crud-form-title">
            <span>{idEdicao ? "Editando registro" : "Novo cadastro"}</span>
            <h2>{idEdicao ? "Editar peludo" : "Cadastrar peludo"}</h2>
          </div>

          <label>
            Nome do peludo
            <input
              type="text"
              name="nome"
              value={formulario.nome}
              onChange={atualizarCampo}
              placeholder="Ex: Luna"
            />
          </label>

          <label>
            Tipo
            <select
              name="tipo"
              value={formulario.tipo}
              onChange={atualizarCampo}
            >
              <option value="Cachorro">Cachorro</option>
              <option value="Gato">Gato</option>
            </select>
          </label>

          <label>
            Idade
            <input
              type="text"
              name="idade"
              value={formulario.idade}
              onChange={atualizarCampo}
              placeholder="Ex: 2 anos"
            />
          </label>

          <label>
            Status
            <select
              name="status"
              value={formulario.status}
              onChange={atualizarCampo}
            >
              <option value="Disponível">Disponível</option>
              <option value="Em análise">Em análise</option>
              <option value="Adotado">Adotado</option>
            </select>
          </label>

          <label>
            Descrição
            <textarea
              name="descricao"
              value={formulario.descricao}
              onChange={atualizarCampo}
              placeholder="Descreva o comportamento do peludo"
              rows="4"
            />
          </label>

          <label>
            Foto do peludo
            <input
              ref={inputImagemRef}
              type="file"
              accept="image/*"
              onChange={selecionarImagem}
            />
          </label>

          {imagemPreview && (
            <div className="crud-preview-imagem">
              <img src={imagemPreview} alt="Prévia do peludo" />
              <span>Prévia da imagem selecionada</span>
            </div>
          )}

          <div className="crud-form-actions">
            <button type="submit" disabled={salvando}>
              {salvando
                ? "Salvando..."
                : idEdicao
                ? "Salvar alterações"
                : "Cadastrar peludo"}
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
              <h2>Peludos cadastrados</h2>
            </div>

            <strong>
              {peludosFiltrados.length} de {peludos.length} registros
            </strong>
          </div>

          <div className="pets-admin-filtros">
            <input
              type="text"
              placeholder="Buscar por nome, idade, descrição ou status"
              value={busca}
              onChange={(evento) => setBusca(evento.target.value)}
            />

            <select
              value={tipoFiltro}
              onChange={(evento) => setTipoFiltro(evento.target.value)}
            >
              <option value="Todos">Todos os tipos</option>
              <option value="Cachorro">Cachorros</option>
              <option value="Gato">Gatos</option>
            </select>

            <select
              value={statusFiltro}
              onChange={(evento) => setStatusFiltro(evento.target.value)}
            >
              <option value="Todos">Todos os status</option>
              <option value="Disponível">Disponível</option>
              <option value="Em análise">Em análise</option>
              <option value="Adotado">Adotado</option>
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
            <div className="crud-vazio">Carregando peludos...</div>
          ) : peludosFiltrados.length === 0 ? (
            <div className="crud-vazio">
              Nenhum peludo encontrado para os filtros selecionados.
            </div>
          ) : (
            <div className="crud-table-wrapper">
              <table className="crud-table">
                <thead>
                  <tr>
                    <th>Peludo</th>
                    <th>Tipo</th>
                    <th>Idade</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {peludosFiltrados.map((peludo) => (
                    <tr key={peludo.id}>
                      <td>
                        <div className="crud-pet-cell">
                          <img
                            src={obterImagemPeludo(peludo.id)}
                            alt={peludo.nome}
                          />

                          <div>
                            <strong>{peludo.nome}</strong>
                            <small>{peludo.descricao || "Sem descrição"}</small>
                          </div>
                        </div>
                      </td>

                      <td>{peludo.tipo}</td>
                      <td>{peludo.idade}</td>

                      <td>
                        <span className="crud-status">{peludo.status}</span>
                      </td>

                      <td>
                        <div className="crud-acoes">
                          <button
                            type="button"
                            onClick={() => editarPeludo(peludo)}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            className="excluir"
                            onClick={() => excluirPeludo(peludo.id)}
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

export default Pets;