const request = require('supertest');
const app = require('../server');
const conexao = require('../conexao');

describe('Integração - Pedidos e Relatórios', () => {
  it('Deve listar todos os pedidos', async () => {
    const res = await request(app).get('/api/pedidos');
    expect(res.statusCode).toBe(200);
  });

  it('Particionamento: Deve bloquear pedido sem data', async () => {
    const res = await request(app).post('/api/pedidos').send({
      interessado_id: 1,
      peludo_id: 1
    });
    expect(res.statusCode).toBe(400);
  });

  it('Deve carregar relatórios (JOIN)', async () => {
    const res = await request(app).get('/api/relatorio');
    expect(res.statusCode).toBe(200);
  });

  afterAll(() => conexao.end());
});