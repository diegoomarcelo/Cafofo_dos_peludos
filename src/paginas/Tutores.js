import { useEffect, useState } from 'react';

const API_INTERESSADOS = 'http://localhost:3001/api/interessados';

const formularioInicial = {
  nome: '',
  email: '',
  telefone: '',
  cidade: '',
  endereco: '',
  perfil_adocao: '',
};

function Tutores() {
  const [interessados, setInteressados] = useState([]);
  const [formulario, setFormulario] = useState(formularioInicial);
  const [idEdicao, setIdEdicao] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const [busca, setBusca] = useState('');
  const [cidadeFiltro, setCidadeFiltro] = useState('Todas');

  useEffect(() => {
    carregarInteressados();
  }, []);

  async function carregarInteressados() {
    try {
      setCarregando(true);
      setErro('');

      const resposta = await fetch(API_INTERESSADOS);

      if (!resposta.ok) {
        throw new Error('Não foi possível carregar os interessados.');
      }

      const dados = await resposta.json();
      setInteressados(dados);
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
    setMensagem('');
    setErro('');
  }

  function limparFiltros() {
    setBusca('');
    setCidadeFiltro('Todas');
  }

  async function salvarInteressado(evento) {
    evento.preventDefault();

    if (
      !formulario.nome ||
      !formulario.email ||
      !formulario.telefone ||
      !formulario.cidade
    ) {
      setErro('Preencha nome, e-mail, telefone e cidade.');
      return;
    }

    try {
      setSalvando(true);
      setErro('');
      setMensagem('');

      const url = idEdicao
        ? `${API_INTERESSADOS}/${idEdicao}`
        : API_INTERESSADOS;

      const metodo = idEdicao ? 'PUT' : 'POST';

      const resposta = await fetch(url, {
        method: metodo,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formulario),
      });

      const dadosResposta = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        throw new Error(
          dadosResposta.mensagem || 'Não foi possível salvar o interessado.'
        );
      }

      setMensagem(
        idEdicao
          ? 'Interessado atualizado com sucesso!'
          : 'Interessado cadastrado com sucesso!'
      );

      setFormulario(formularioInicial);
      setIdEdicao(null);

      await carregarInteressados();
    } catch (error) {
      setErro(error.message);
    } finally {
      setSalvando(false);
    }
  }

  function editarInteressado(interessado) {
    setIdEdicao(interessado.id);

    setFormulario({
      nome: interessado.nome || '',
      email: interessado.email || '',
      telefone: interessado.telefone || '',
      cidade: interessado.cidade || '',
      endereco: interessado.endereco || '',
      perfil_adocao: interessado.perfil_adocao || '',
    });

    setMensagem('');
    setErro('');

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  async function excluirInteressado(id) {
    const confirmar = window.confirm(
      'Tem certeza que deseja excluir este interessado?'
    );

    if (!confirmar) {
      return;
    }

    try {
      setErro('');
      setMensagem('');

      const resposta = await fetch(`${API_INTERESSADOS}/${id}`, {
        method: 'DELETE',
      });

      const dadosResposta = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        throw new Error(
          dadosResposta.mensagem || 'Não foi possível excluir o interessado.'
        );
      }

      if (idEdicao === id) {
        limparFormulario();
      }

      setMensagem('Interessado excluído com sucesso!');
      await carregarInteressados();
    } catch (error) {
      setErro(error.message);
    }
  }

  const cidadesDisponiveis = [
    'Todas',
    ...new Set(
      interessados
        .map((interessado) => interessado.cidade)
        .filter((cidade) => cidade && cidade.trim() !== '')
    ),
  ];

  const interessadosFiltrados = interessados.filter((interessado) => {
    const textoBusca = busca.trim().toLowerCase();

    const nome = (interessado.nome || '').toLowerCase();
    const email = (interessado.email || '').toLowerCase();
    const telefone = (interessado.telefone || '').toLowerCase();
    const cidade = (interessado.cidade || '').toLowerCase();
    const endereco = (interessado.endereco || '').toLowerCase();
    const perfil = (interessado.perfil_adocao || '').toLowerCase();

    const combinaBusca =
      textoBusca === '' ||
      nome.includes(textoBusca) ||
      email.includes(textoBusca) ||
      telefone.includes(textoBusca) ||
      cidade.includes(textoBusca) ||
      endereco.includes(textoBusca) ||
      perfil.includes(textoBusca);

    const combinaCidade =
      cidadeFiltro === 'Todas' || interessado.cidade === cidadeFiltro;

    return combinaBusca && combinaCidade;
  });

  return (
    <section className="crud-admin-page">
      <div className="crud-admin-header">
        <div>
          <h1>Gestão de Interessados</h1>
          <p>
            Cadastre, edite, liste e exclua pessoas interessadas em adoção.
          </p>
        </div>

        <button type="button" onClick={carregarInteressados}>
          Atualizar lista
        </button>
      </div>

      {mensagem && <div className="crud-alerta sucesso">{mensagem}</div>}
      {erro && <div className="crud-alerta erro">{erro}</div>}

      <div className="crud-admin-grid">
        <form className="crud-form-card" onSubmit={salvarInteressado}>
          <div className="crud-form-title">
            <span>{idEdicao ? 'Editando registro' : 'Novo cadastro'}</span>
            <h2>{idEdicao ? 'Editar interessado' : 'Cadastrar interessado'}</h2>
          </div>

          <label>
            Nome completo
            <input
              type="text"
              name="nome"
              value={formulario.nome}
              onChange={atualizarCampo}
              placeholder="Ex: Ana Clara"
            />
          </label>

          <label>
            E-mail
            <input
              type="email"
              name="email"
              value={formulario.email}
              onChange={atualizarCampo}
              placeholder="Ex: ana@email.com"
            />
          </label>

          <label>
            Telefone
            <input
              type="text"
              name="telefone"
              value={formulario.telefone}
              onChange={atualizarCampo}
              placeholder="Ex: (61) 99999-9999"
            />
          </label>

          <label>
            Cidade
            <input
              type="text"
              name="cidade"
              value={formulario.cidade}
              onChange={atualizarCampo}
              placeholder="Ex: Brasília - DF"
            />
          </label>

          <label>
            Endereço
            <input
              type="text"
              name="endereco"
              value={formulario.endereco}
              onChange={atualizarCampo}
              placeholder="Ex: Taguatinga Sul"
            />
          </label>

          <label>
            Perfil de adoção
            <textarea
              name="perfil_adocao"
              value={formulario.perfil_adocao}
              onChange={atualizarCampo}
              placeholder="Ex: Procura um animal dócil para apartamento"
              rows="4"
            />
          </label>

          <div className="crud-form-actions">
            <button type="submit" disabled={salvando}>
              {salvando
                ? 'Salvando...'
                : idEdicao
                ? 'Salvar alterações'
                : 'Cadastrar interessado'}
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
              <h2>Interessados cadastrados</h2>
            </div>

            <strong>
              {interessadosFiltrados.length} de {interessados.length} registros
            </strong>
          </div>

          <div className="interessados-admin-filtros">
            <input
              type="text"
              placeholder="Buscar por nome, e-mail, telefone, cidade ou perfil"
              value={busca}
              onChange={(evento) => setBusca(evento.target.value)}
            />

            <select
              value={cidadeFiltro}
              onChange={(evento) => setCidadeFiltro(evento.target.value)}
            >
              {cidadesDisponiveis.map((cidade) => (
                <option key={cidade} value={cidade}>
                  {cidade}
                </option>
              ))}
            </select>

            <button type="button" onClick={limparFiltros}>
              Limpar filtros
            </button>
          </div>

          {carregando ? (
            <div className="crud-vazio">Carregando interessados...</div>
          ) : interessadosFiltrados.length === 0 ? (
            <div className="crud-vazio">
              Nenhum interessado encontrado para os filtros selecionados.
            </div>
          ) : (
            <div className="crud-table-wrapper">
              <table className="crud-table interessados-table">
                <thead>
                  <tr>
                    <th>Interessado</th>
                    <th>Telefone</th>
                    <th>Cidade</th>
                    <th>Perfil</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {interessadosFiltrados.map((interessado) => (
                    <tr key={interessado.id}>
                      <td>
                        <div className="interessado-cell">
                          <strong className="interessado-nome">
                            {interessado.nome}
                          </strong>

                          <span className="interessado-email">
                            {interessado.email}
                          </span>
                        </div>
                      </td>

                      <td>
                        <span className="telefone-cell">
                          {interessado.telefone}
                        </span>
                      </td>

                      <td>
                        <span className="cidade-cell">
                          {interessado.cidade}
                        </span>
                      </td>

                      <td>
                        <div className="perfil-cell">
                          {interessado.perfil_adocao ||
                            interessado.endereco ||
                            'Sem perfil informado'}
                        </div>
                      </td>

                      <td>
                        <div className="crud-acoes">
                          <button
                            type="button"
                            onClick={() => editarInteressado(interessado)}
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            className="excluir"
                            onClick={() => excluirInteressado(interessado.id)}
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

export default Tutores;  