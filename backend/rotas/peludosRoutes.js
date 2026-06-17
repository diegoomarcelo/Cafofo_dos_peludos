const express = require('express');
const router = express.Router();

const conexao = require('../conexao');

// LISTAR todos os peludos
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM peludos ORDER BY id DESC';

  conexao.query(sql, (erro, resultados) => {
    if (erro) {
      console.error('Erro ao listar peludos:', erro.message);
      return res.status(500).json({ mensagem: 'Erro ao listar peludos.' });
    }

    res.json(resultados);
  });
});

// CADASTRAR um novo peludo
router.post('/', (req, res) => {
  const { nome, tipo, idade, descricao, status } = req.body;

  if (!nome || !tipo || !idade || !status) {
    return res.status(400).json({
      mensagem: 'Nome, tipo, idade e status são obrigatórios.'
    });
  }

  const sql = `
    INSERT INTO peludos (nome, tipo, idade, descricao, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  const valores = [nome, tipo, idade, descricao, status];

  conexao.query(sql, valores, (erro, resultado) => {
    if (erro) {
      console.error('Erro ao cadastrar peludo:', erro.message);
      return res.status(500).json({ mensagem: 'Erro ao cadastrar peludo.' });
    }

    res.status(201).json({
      mensagem: 'Peludo cadastrado com sucesso!',
      id: resultado.insertId
    });
  });
});

// BUSCAR um peludo pelo ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'SELECT * FROM peludos WHERE id = ?';

  conexao.query(sql, [id], (erro, resultados) => {
    if (erro) {
      console.error('Erro ao buscar peludo:', erro.message);
      return res.status(500).json({ mensagem: 'Erro ao buscar peludo.' });
    }

    if (resultados.length === 0) {
      return res.status(404).json({ mensagem: 'Peludo não encontrado.' });
    }

    res.json(resultados[0]);
  });
});

// EDITAR um peludo
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, tipo, idade, descricao, status } = req.body;

  if (!nome || !tipo || !idade || !status) {
    return res.status(400).json({
      mensagem: 'Nome, tipo, idade e status são obrigatórios.'
    });
  }

  const sql = `
    UPDATE peludos
    SET nome = ?, tipo = ?, idade = ?, descricao = ?, status = ?
    WHERE id = ?
  `;

  const valores = [nome, tipo, idade, descricao, status, id];

  conexao.query(sql, valores, (erro, resultado) => {
    if (erro) {
      console.error('Erro ao editar peludo:', erro.message);
      return res.status(500).json({ mensagem: 'Erro ao editar peludo.' });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensagem: 'Peludo não encontrado.' });
    }

    res.json({ mensagem: 'Peludo atualizado com sucesso!' });
  });
});

// EXCLUIR um peludo
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM peludos WHERE id = ?';

  conexao.query(sql, [id], (erro, resultado) => {
    if (erro) {
      console.error('Erro ao excluir peludo:', erro.message);
      return res.status(500).json({
        mensagem: 'Erro ao excluir peludo. Verifique se ele não está vinculado a um pedido de adoção.'
      });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensagem: 'Peludo não encontrado.' });
    }

    res.json({ mensagem: 'Peludo excluído com sucesso!' });
  });
});

module.exports = router;