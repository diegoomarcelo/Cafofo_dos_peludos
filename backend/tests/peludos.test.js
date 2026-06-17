const request = require('supertest');
const app = require('../server'); // Importa o servidor

describe('Testes de Integração - CRUD Peludos', () => {
  
  // Teste 1: Caminho Feliz
  it('Deve cadastrar um peludo com sucesso', async () => {
    const res = await request(app)
      .post('/api/peludos')
      .send({
        nome: 'Caramelo',
        tipo: 'Cachorro',
        idade: 2,
        descricao: 'Muito dócil',
        status: 'Disponível'
      });
    
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('mensagem', 'Peludo cadastrado com sucesso!');
  });

  // Teste 2: Técnica de Valor Limite
  it('Deve retornar erro ao tentar salvar um nome maior que o limite do banco', async () => {
    const nomeGigante = 'A'.repeat(260); // Estoura o limite de VARCHAR
    
    const res = await request(app)
      .post('/api/peludos')
      .send({
        nome: nomeGigante,
        tipo: 'Gato',
        idade: 1,
        descricao: 'Pequeno',
        status: 'Disponível'
      });

    // Espera que a API retorne um erro (400 ou 500) e não grave no banco
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });
});