describe('Testes de Sistema - E2E (4 Casos)', () => {
  
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.get('#email').type('teste@cafofo.com');
    cy.get('#senha').type('123456');
    cy.contains('button', 'Entrar').click();
    cy.url().should('include', '/dashboard');
    cy.visit('http://localhost:3000/tutores');
  });

  it('1. Deve barrar formulário vazio', () => {
    cy.contains('button', 'Cadastrar interessado').click({ force: true });
    cy.get('.crud-alerta.erro').should('contain', 'Preencha nome, e-mail, telefone e cidade.');
  });

  it('2. Deve preencher e salvar um interessado', () => {
    cy.get('input[name="nome"]').type('Ana Silva');
    cy.get('input[name="email"]').type('ana@silva.com');
    cy.get('input[name="telefone"]').type('11988888888');
    cy.get('input[name="cidade"]').type('Brasília');
    cy.contains('button', 'Cadastrar interessado').click({ force: true });
    cy.get('.crud-alerta.sucesso').should('contain', 'Interessado cadastrado');
  });

  it('3. Deve editar um interessado', () => {
    cy.contains('.interessados-table tr', 'Ana Silva').contains('button', 'Editar').click({ force: true });
    cy.get('input[name="cidade"]').clear().type('Goiânia');
    cy.contains('button', 'Salvar alterações').click({ force: true });
    cy.get('.crud-alerta.sucesso').should('contain', 'atualizado');
  });

  it('4. Deve excluir um interessado', () => {
    cy.on('window:confirm', () => true);
    cy.contains('.interessados-table tr', 'Ana Silva').contains('button', 'Excluir').click({ force: true });
    cy.get('.crud-alerta.sucesso').should('contain', 'excluído');
  });
});