const request = require('supertest');

const app = require('../server');
const conexao = require('../conexao');

describe('Testes de Integração - CRUD de Interessados/Tutores', () => {
  test('Classe válida: deve cadastrar um interessado com todos os dados obrigatórios', async () => {
    const interessadoValido = {
      nome: 'Interessado Teste',
      email: `interessado.teste.${Date.now()}@email.com`,
      telefone: '61999998888',
      cidade: 'Brasília',
      endereco: 'Rua de Teste, 123',
      perfil_adocao: 'Procura um cachorro de pequeno porte para companhia.'
    };

    const resposta = await request(app)
      .post('/api/interessados')
      .send(interessadoValido);

    expect([200, 201]).toContain(resposta.statusCode);
    expect(resposta.body).toHaveProperty('mensagem');
    expect(resposta.body).toHaveProperty('id');
  });

  test('Classe inválida: não deve cadastrar interessado sem e-mail obrigatório', async () => {
    const interessadoInvalido = {
      nome: 'Interessado Sem Email',
      telefone: '61988887777',
      cidade: 'Ceilândia',
      endereco: 'Endereço de Teste',
      perfil_adocao: 'Procura um gato calmo para apartamento.'
    };

    const resposta = await request(app)
      .post('/api/interessados')
      .send(interessadoInvalido);

    expect(resposta.statusCode).toBe(400);
    expect(resposta.body).toHaveProperty('mensagem');
  });
});

afterAll((done) => {
  conexao.end((erro) => {
    if (erro) {
      return done(erro);
    }

    done();
  });
});