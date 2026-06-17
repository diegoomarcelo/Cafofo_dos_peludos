const express = require('express');
const cors = require('cors');
require('dotenv').config();

const conexao = require('./conexao');

const peludosRoutes = require('./rotas/peludosRoutes');
const interessadosRoutes = require('./rotas/interessadosRoutes');
const pedidosRoutes = require('./rotas/pedidosRoutes');
const relatorioRoutes = require('./rotas/relatorioRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Permite que o front-end React se comunique com o back-end.
app.use(cors());

// Permite receber dados em formato JSON.
app.use(express.json());

// Rota inicial para testar se o servidor está funcionando.
app.get('/', (req, res) => {
  res.json({ mensagem: 'Cafofo dos Peludos funcionando!' });
});

// Rota temporária para testar se o back-end conecta ao MySQL.
app.get('/teste-banco', (req, res) => {
  conexao.query('SELECT DATABASE() AS banco', (erro, resultado) => {
    if (erro) {
      console.error('Erro ao conectar com o MySQL:', erro.message);

      return res.status(500).json({
        mensagem: 'Erro ao conectar com o banco de dados.',
      });
    }

    res.json({
      mensagem: 'Conexão com MySQL realizada com sucesso!',
      banco: resultado[0].banco,
    });
  });
});

// Rotas principais dos CRUDs.
app.use('/api/peludos', peludosRoutes);
app.use('/api/interessados', interessadosRoutes);
app.use('/api/pedidos', pedidosRoutes);

// Rota do relatório com JOIN.
app.use('/api/relatorio', relatorioRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});