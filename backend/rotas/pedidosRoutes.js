const express = require('express');
const router = express.Router();

const conexao = require('../conexao');

console.log('pedidosRoutes.js carregado com sucesso');

// ROTA DE TESTE DO PUT
// Teste no Thunder Client:
// PUT http://localhost:3001/api/pedidos/teste
router.put('/teste', (req, res) => {
  res.json({
    mensagem: 'PUT de teste funcionando!'
  });
});

// LISTAR todos os pedidos de adoção
router.get('/', (req, res) => {
  const sql = `
    SELECT 
      pedidos_adocao.id,
      pedidos_adocao.interessado_id,
      pedidos_adocao.peludo_id,
      pedidos_adocao.data_solicitacao,
      pedidos_adocao.status,
      pedidos_adocao.observacoes
    FROM pedidos_adocao
    ORDER BY pedidos_adocao.id DESC
  `;

  conexao.query(sql, (erro, resultados) => {
    if (erro) {
      console.error('Erro ao listar pedidos:', erro.message);

      return res.status(500).json({
        mensagem: 'Erro ao listar pedidos de adoção.'
      });
    }

    res.json(resultados);
  });
});

// CADASTRAR novo pedido de adoção
router.post('/', (req, res) => {
  const {
    interessado_id,
    peludo_id,
    data_solicitacao,
    status,
    observacoes
  } = req.body;

  if (!interessado_id || !peludo_id || !data_solicitacao) {
    return res.status(400).json({
      mensagem: 'Interessado, peludo e data da solicitação são obrigatórios.'
    });
  }

  const statusPedido = status || 'Em análise';

  const sql = `
    INSERT INTO pedidos_adocao 
    (interessado_id, peludo_id, data_solicitacao, status, observacoes)
    VALUES (?, ?, ?, ?, ?)
  `;

  const valores = [
    interessado_id,
    peludo_id,
    data_solicitacao,
    statusPedido,
    observacoes
  ];

  conexao.query(sql, valores, (erro, resultado) => {
    if (erro) {
      console.error('Erro ao cadastrar pedido:', erro.message);

      return res.status(500).json({
        mensagem: 'Erro ao cadastrar pedido. Verifique se o interessado e o peludo existem.'
      });
    }

    res.status(201).json({
      mensagem: 'Pedido salvo com sucesso!',
      id: resultado.insertId
    });
  });
});

// BUSCAR pedido por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT 
      pedidos_adocao.id,
      pedidos_adocao.interessado_id,
      pedidos_adocao.peludo_id,
      pedidos_adocao.data_solicitacao,
      pedidos_adocao.status,
      pedidos_adocao.observacoes
    FROM pedidos_adocao
    WHERE pedidos_adocao.id = ?
  `;

  conexao.query(sql, [id], (erro, resultados) => {
    if (erro) {
      console.error('Erro ao buscar pedido:', erro.message);

      return res.status(500).json({
        mensagem: 'Erro ao buscar pedido de adoção.'
      });
    }

    if (resultados.length === 0) {
      return res.status(404).json({
        mensagem: 'Pedido de adoção não encontrado.'
      });
    }

    res.json(resultados[0]);
  });
});

// EDITAR pedido de adoção
router.put('/:id', (req, res) => {
  const { id } = req.params;

  const {
    interessado_id,
    peludo_id,
    data_solicitacao,
    status,
    observacoes
  } = req.body;

  if (!interessado_id || !peludo_id || !data_solicitacao || !status) {
    return res.status(400).json({
      mensagem: 'Interessado, peludo, data e status são obrigatórios.'
    });
  }

  const sql = `
    UPDATE pedidos_adocao
    SET 
      interessado_id = ?,
      peludo_id = ?,
      data_solicitacao = ?,
      status = ?,
      observacoes = ?
    WHERE id = ?
  `;

  const valores = [
    interessado_id,
    peludo_id,
    data_solicitacao,
    status,
    observacoes,
    id
  ];

  conexao.query(sql, valores, (erro, resultado) => {
    if (erro) {
      console.error('Erro ao editar pedido:', erro.message);

      return res.status(500).json({
        mensagem: 'Erro ao editar pedido. Verifique se o interessado e o peludo existem.'
      });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensagem: 'Pedido de adoção não encontrado.'
      });
    }

    res.json({
      mensagem: 'Pedido de adoção atualizado com sucesso!'
    });
  });
});

// EXCLUIR pedido de adoção
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const sql = `
    DELETE FROM pedidos_adocao
    WHERE id = ?
  `;

  conexao.query(sql, [id], (erro, resultado) => {
    if (erro) {
      console.error('Erro ao excluir pedido:', erro.message);

      return res.status(500).json({
        mensagem: 'Erro ao excluir pedido de adoção.'
      });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensagem: 'Pedido de adoção não encontrado.'
      });
    }

    res.json({
      mensagem: 'Pedido de adoção excluído com sucesso!'
    });
  });
});

module.exports = router;