// Chaves usadas apenas para dados locais do navegador.
// Os dados principais dos CRUDs são armazenados no MySQL.

export const CHAVES_STORAGE = {
  USUARIO_LOGADO: 'cafofo_sessao_usuario',
  IMAGENS_PELUDOS: 'cafofo_imagens_peludos',
};

// Chave antiga usada antes em alguns arquivos.
// Ela fica aqui só para não perder imagens que já foram salvas nos testes.
const CHAVE_ANTIGA_IMAGENS_PELUDOS = 'imagensPeludos';

export const IMAGENS_FIXAS_PELUDOS = {
  1: '/img/peludos/peludo1.jpg',
  2: '/img/peludos/peludo2.png',
  3: '/img/peludos/peludo3.jpg',
  4: '/img/peludos/peludo4.jpg',
  5: '/img/peludos/peludo5.jpeg',
  6: '/img/peludos/peludo6.jpeg',
  7: '/img/peludos/peludo7.jpg',
  8: '/img/peludos/peludo8.jpg',
  9: '/img/peludos/peludo9.jpeg',
  10: '/img/peludos/peludo10.jpeg',
  11: '/img/peludos/peludo11.jpeg',
  12: '/img/peludos/peludo12.jpeg',
  13: '/img/peludos/peludo13.png',
  14: '/img/peludos/peludo14.jpeg',
  15: '/img/peludos/peludo15.jpeg',
  16: '/img/peludos/peludo16.jpg',
  17: '/img/peludos/peludo17.jpeg',
  18: '/img/peludos/peludo18.jpeg',
  19: '/img/peludos/peludo19.jpeg',
  20: '/img/peludos/peludo20.jpg',
};

export function buscarDadosLocais(chave, valorPadrao = null) {
  try {
    const dados = localStorage.getItem(chave);

    if (!dados) {
      return valorPadrao;
    }

    return JSON.parse(dados);
  } catch (error) {
    return valorPadrao;
  }
}

export function salvarDadosLocais(chave, dados) {
  localStorage.setItem(chave, JSON.stringify(dados));
}

export function removerDadosLocais(chave) {
  localStorage.removeItem(chave);
}

export function buscarImagensPeludos() {
  const imagensAntigas = buscarDadosLocais(CHAVE_ANTIGA_IMAGENS_PELUDOS, {});
  const imagensNovas = buscarDadosLocais(CHAVES_STORAGE.IMAGENS_PELUDOS, {});

  return {
    ...imagensAntigas,
    ...imagensNovas,
  };
}

export function obterImagemPeludo(id) {
  const imagensSalvas = buscarImagensPeludos();

  return (
    imagensSalvas[id] ||
    IMAGENS_FIXAS_PELUDOS[id] ||
    '/img/peludos/peludo1.jpg'
  );
}

export function salvarImagemPeludo(id, imagem) {
  const imagensSalvas = buscarImagensPeludos();

  imagensSalvas[id] = imagem;

  salvarDadosLocais(CHAVES_STORAGE.IMAGENS_PELUDOS, imagensSalvas);
}

export function removerImagemPeludo(id) {
  const imagensNovas = buscarDadosLocais(CHAVES_STORAGE.IMAGENS_PELUDOS, {});
  const imagensAntigas = buscarDadosLocais(CHAVE_ANTIGA_IMAGENS_PELUDOS, {});

  delete imagensNovas[id];
  delete imagensAntigas[id];

  salvarDadosLocais(CHAVES_STORAGE.IMAGENS_PELUDOS, imagensNovas);
  salvarDadosLocais(CHAVE_ANTIGA_IMAGENS_PELUDOS, imagensAntigas);
}