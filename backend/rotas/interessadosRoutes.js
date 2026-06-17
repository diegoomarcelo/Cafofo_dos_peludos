const express = require('express');
const router = express.Router();

const conexao = require('../conexao');

// LISTAR todos os interessados
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM interessados ORDER BY id DESC';

  conexao.query(sql, (erro, resultados) => {
    if (erro) {
      console.error('Erro ao listar interessados:', erro.message);
      return res.status(500).json({ mensagem: 'Erro ao listar interessados.' });
    }

    res.json(resultados);
  });
});

// CADASTRAR um novo interessado
router.post('/', (req, res) => {
  const { nome, email, telefone, cidade, endereco, perfil_adocao } = req.body;

  if (!nome || !email || !telefone || !cidade) {
    return res.status(400).json({
      mensagem: 'Nome, e-mail, telefone e cidade são obrigatórios.'
    });
  }

  const sql = `
    INSERT INTO interessados 
    (nome, email, telefone, cidade, endereco, perfil_adocao)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const valores = [nome, email, telefone, cidade, endereco, perfil_adocao];

  conexao.query(sql, valores, (erro, resultado) => {
    if (erro) {
      console.error('Erro ao cadastrar interessado:', erro.message);
      return res.status(500).json({ mensagem: 'Erro ao cadastrar interessado.' });
    }

    res.status(201).json({
      mensagem: 'Interessado cadastrado com sucesso!',
      id: resultado.insertId
    });
  });
});

// BUSCAR um interessado pelo ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'SELECT * FROM interessados WHERE id = ?';

  conexao.query(sql, [id], (erro, resultados) => {
    if (erro) {
      console.error('Erro ao buscar interessado:', erro.message);
      return res.status(500).json({ mensagem: 'Erro ao buscar interessado.' });
    }

    if (resultados.length === 0) {
      return res.status(404).json({ mensagem: 'Interessado não encontrado.' });
    }

    res.json(resultados[0]);
  });
});

// EDITAR um interessado
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone, cidade, endereco, perfil_adocao } = req.body;

  if (!nome || !email || !telefone || !cidade) {
    return res.status(400).json({
      mensagem: 'Nome, e-mail, telefone e cidade são obrigatórios.'
    });
  }

  const sql = `
    UPDATE interessados
    SET nome = ?, email = ?, telefone = ?, cidade = ?, endereco = ?, perfil_adocao = ?
    WHERE id = ?
  `;

  const valores = [nome, email, telefone, cidade, endereco, perfil_adocao, id];

  conexao.query(sql, valores, (erro, resultado) => {
    if (erro) {
      console.error('Erro ao editar interessado:', erro.message);
      return res.status(500).json({ mensagem: 'Erro ao editar interessado.' });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensagem: 'Interessado não encontrado.' });
    }

    res.json({ mensagem: 'Interessado atualizado com sucesso!' });
  });
});

// EXCLUIR um interessado
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM interessados WHERE id = ?';

  conexao.query(sql, [id], (erro, resultado) => {
    if (erro) {
      console.error('Erro ao excluir interessado:', erro.message);
      return res.status(500).json({
        mensagem: 'Erro ao excluir interessado. Verifique se ele não está vinculado a um pedido de adoção.'
      });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensagem: 'Interessado não encontrado.' });
    }

    res.json({ mensagem: 'Interessado excluído com sucesso!' });
  });
});

module.exports = router;