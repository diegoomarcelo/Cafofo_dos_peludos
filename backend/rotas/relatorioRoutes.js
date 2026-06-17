const express = require('express');
const router = express.Router();

const conexao = require('../conexao');

console.log('relatorioRoutes.js carregado com sucesso');

// =======================================================
// RELATÓRIO GERAL COM JOIN
// GET http://localhost:3001/api/relatorio
// =======================================================
router.get('/', (req, res) => {
  const sql = `
    SELECT
      pedidos_adocao.id AS pedido_id,

      pedidos_adocao.interessado_id,
      interessados.nome AS nome_interessado,
      interessados.email AS email_interessado,
      interessados.telefone AS telefone_interessado,
      interessados.cidade AS cidade_interessado,

      pedidos_adocao.peludo_id,
      peludos.nome AS nome_peludo,
      peludos.tipo AS tipo_peludo,
      peludos.idade AS idade_peludo,
      peludos.status AS status_peludo,

      pedidos_adocao.data_solicitacao,
      DATE_FORMAT(pedidos_adocao.data_solicitacao, '%d/%m/%Y') AS data_formatada,
      pedidos_adocao.status AS status_pedido,
      pedidos_adocao.observacoes

    FROM pedidos_adocao

    INNER JOIN interessados
      ON pedidos_adocao.interessado_id = interessados.id

    INNER JOIN peludos
      ON pedidos_adocao.peludo_id = peludos.id

    ORDER BY pedidos_adocao.id DESC
  `;

  conexao.query(sql, (erro, resultados) => {
    if (erro) {
      console.error('Erro ao gerar relatório:', erro.message);

      return res.status(500).json({
        mensagem: 'Erro ao gerar relatório de adoções.'
      });
    }

    res.json(resultados);
  });
});

// =======================================================
// INDICADORES DO RELATÓRIO
// GET http://localhost:3001/api/relatorio/indicadores/resumo
// =======================================================
router.get('/indicadores/resumo', (req, res) => {
  const sql = `
    SELECT
      COUNT(*) AS total_pedidos,

      SUM(CASE WHEN status = 'Em análise' THEN 1 ELSE 0 END) AS pedidos_em_analise,
      SUM(CASE WHEN status = 'Aprovada' THEN 1 ELSE 0 END) AS pedidos_aprovados,
      SUM(CASE WHEN status = 'Finalizada' THEN 1 ELSE 0 END) AS pedidos_finalizados,
      SUM(CASE WHEN status = 'Cancelada' THEN 1 ELSE 0 END) AS pedidos_cancelados

    FROM pedidos_adocao
  `;

  conexao.query(sql, (erro, resultados) => {
    if (erro) {
      console.error('Erro ao buscar indicadores:', erro.message);

      return res.status(500).json({
        mensagem: 'Erro ao buscar indicadores do relatório.'
      });
    }

    res.json(resultados[0]);
  });
});

// =======================================================
// RELATÓRIO DE UM PEDIDO ESPECÍFICO
// GET http://localhost:3001/api/relatorio/4
// =======================================================
router.get('/:id', (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT
      pedidos_adocao.id AS pedido_id,

      pedidos_adocao.interessado_id,
      interessados.nome AS nome_interessado,
      interessados.email AS email_interessado,
      interessados.telefone AS telefone_interessado,
      interessados.cidade AS cidade_interessado,

      pedidos_adocao.peludo_id,
      peludos.nome AS nome_peludo,
      peludos.tipo AS tipo_peludo,
      peludos.idade AS idade_peludo,
      peludos.status AS status_peludo,

      pedidos_adocao.data_solicitacao,
      DATE_FORMAT(pedidos_adocao.data_solicitacao, '%d/%m/%Y') AS data_formatada,
      pedidos_adocao.status AS status_pedido,
      pedidos_adocao.observacoes

    FROM pedidos_adocao

    INNER JOIN interessados
      ON pedidos_adocao.interessado_id = interessados.id

    INNER JOIN peludos
      ON pedidos_adocao.peludo_id = peludos.id

    WHERE pedidos_adocao.id = ?
  `;

  conexao.query(sql, [id], (erro, resultados) => {
    if (erro) {
      console.error('Erro ao buscar relatório por ID:', erro.message);

      return res.status(500).json({
        mensagem: 'Erro ao buscar relatório do pedido.'
      });
    }

    if (resultados.length === 0) {
      return res.status(404).json({
        mensagem: 'Pedido não encontrado no relatório.'
      });
    }

    res.json(resultados[0]);
  });
});

module.exports = router;