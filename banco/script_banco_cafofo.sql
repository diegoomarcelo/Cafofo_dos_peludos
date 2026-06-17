-- =========================================================
-- CAFOFO DOS PELUDOS - SCRIPT DO BANCO DE DADOS
-- Avaliação N2 - Programação Web
-- =========================================================

-- Remove o banco caso ele já exista.
-- Isso evita duplicação de dados caso o script seja executado mais de uma vez.
DROP DATABASE IF EXISTS cafofo_dos_peludos;

-- Cria o banco de dados.
CREATE DATABASE cafofo_dos_peludos;

-- Seleciona o banco que será utilizado.
USE cafofo_dos_peludos;

-- =========================================================
-- TABELA: PELUDOS
-- Armazena os animais disponíveis ou em processo de adoção.
-- As imagens não são salvas no MySQL; ficam no front-end/localStorage.
-- =========================================================

CREATE TABLE peludos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    idade VARCHAR(30) NOT NULL,
    descricao TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'Disponível'
);

-- =========================================================
-- TABELA: INTERESSADOS
-- Armazena os tutores/interessados em adotar um peludo.
-- No front-end, essa área aparece como "Tutores".
-- =========================================================

CREATE TABLE interessados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    endereco VARCHAR(200),
    perfil_adocao TEXT
);

-- =========================================================
-- TABELA: PEDIDOS DE ADOÇÃO
-- Relaciona um interessado a um peludo.
-- ON DELETE CASCADE permite excluir tutores ou peludos vinculados
-- sem travar o teste do CRUD durante a apresentação.
-- =========================================================

CREATE TABLE pedidos_adocao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    interessado_id INT NOT NULL,
    peludo_id INT NOT NULL,
    data_solicitacao DATE NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'Pendente',
    observacoes TEXT,

    CONSTRAINT fk_pedido_interessado
        FOREIGN KEY (interessado_id)
        REFERENCES interessados(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_pedido_peludo
        FOREIGN KEY (peludo_id)
        REFERENCES peludos(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- =========================================================
-- DADOS INICIAIS - PELUDOS
-- IDs 1 a 20 combinam com as imagens fixas usadas no front-end:
-- /img/peludos/peludo1...peludo20
-- =========================================================

INSERT INTO peludos (nome, tipo, idade, descricao, status) VALUES
('Luna', 'Cachorro', '2 anos', 'Peluda dócil, carinhosa e indicada para famílias que buscam uma companhia tranquila.', 'Disponível'),
('Thor', 'Cachorro', '3 anos', 'Cachorro brincalhão, companheiro e cheio de energia para passeios e atividades.', 'Disponível'),
('Mia', 'Gato', '1 ano', 'Gatinha tranquila, curiosa e adaptada a ambientes internos.', 'Disponível'),
('Bob', 'Cachorro', '4 anos', 'Cachorro de porte grande, calmo, protetor e muito fiel.', 'Disponível'),
('Mel', 'Gato', '2 anos', 'Gata carinhosa, independente e acostumada com rotina doméstica.', 'Disponível'),
('Nina', 'Cachorro', '2 anos', 'Cachorra alegre, sociável e ideal para quem gosta de animais ativos.', 'Disponível'),
('Simba', 'Gato', '1 ano', 'Gato jovem, esperto e muito brincalhão.', 'Disponível'),
('Amora', 'Cachorro', '1 ano', 'Cachorrinha pequena, dócil e muito carinhosa.', 'Disponível'),
('Max', 'Cachorro', '5 anos', 'Cachorro de grande porte, tranquilo e acostumado com pessoas.', 'Disponível'),
('Belinha', 'Gato', '3 anos', 'Gata observadora, calma e em processo de avaliação para adoção.', 'Em análise'),
('Fred', 'Cachorro', '2 anos', 'Cachorro companheiro, esperto e acostumado a conviver com outros animais.', 'Disponível'),
('Pipoca', 'Gato', '8 meses', 'Gatinho jovem, brincalhão e muito curioso.', 'Disponível'),
('Cristal', 'Cachorro', '2 anos', 'Cachorra dócil, de porte médio e muito apegada às pessoas.', 'Disponível'),
('Oliver', 'Gato', '2 anos', 'Gato calmo, independente e adaptado a apartamento.', 'Disponível'),
('Rex', 'Cachorro', '4 anos', 'Cachorro de grande porte, protetor e ideal para casa com espaço.', 'Disponível'),
('Jade', 'Gato', '1 ano', 'Gatinha carinhosa, tranquila e muito companheira.', 'Disponível'),
('Toby', 'Cachorro', '1 ano', 'Cachorro pequeno, divertido e cheio de energia.', 'Disponível'),
('Chico', 'Gato', '3 anos', 'Gato tranquilo, carinhoso e acostumado com rotina calma.', 'Disponível'),
('Estrela', 'Cachorro', '2 anos', 'Cachorra alegre, sociável e muito afetuosa.', 'Disponível'),
('Theo', 'Gato', '1 ano', 'Gato jovem, curioso e muito brincalhão.', 'Disponível');

-- =========================================================
-- DADOS INICIAIS - INTERESSADOS / TUTORES
-- =========================================================

INSERT INTO interessados (nome, email, telefone, cidade, endereco, perfil_adocao) VALUES
('Fernando Lopes', 'fernandolopes@gmail.com', '61999999', 'Brasília - DF', 'Brasília - DF', 'Procura um animal dócil e companheiro para adoção responsável.'),
('Ana Clara', 'anaclara.lelis@gmail.com', '619995987', 'Taguatinga - DF', 'Taguatinga - DF', 'Tem interesse em adotar um pet tranquilo e adaptado ao ambiente familiar.'),
('Carlos Lima', 'carlos.lima@email.com', '61988882222', 'Ceilândia - DF', 'Ceilândia - DF', 'Busca um cachorro companheiro e com perfil ativo.'),
('Mariana Alves', 'mariana.alves@email.com', '61977773333', 'Águas Claras - DF', 'Águas Claras - DF', 'Mora em apartamento e prefere um gato calmo.'),
('João Pedro', 'joao.pedro@email.com', '61966664444', 'Samambaia - DF', 'Samambaia - DF', 'Deseja adotar um animal de porte médio para companhia.');

-- =========================================================
-- DADOS INICIAIS - PEDIDOS DE ADOÇÃO
-- =========================================================

INSERT INTO pedidos_adocao (interessado_id, peludo_id, data_solicitacao, status, observacoes) VALUES
(1, 2, '2026-06-14', 'Pendente', 'Interessado demonstrou interesse pelo Thor por meio do catálogo público.'),
(1, 1, '2026-06-14', 'Pendente', 'Interessado também demonstrou interesse pela Luna.'),
(2, 3, '2026-06-14', 'Em análise', 'Perfil em avaliação para adoção da Mia.'),
(3, 11, '2026-06-13', 'Em análise', 'Interessado busca um cachorro companheiro.'),
(4, 14, '2026-06-12', 'Aprovada', 'Perfil compatível com o Oliver.'),
(5, 19, '2026-06-11', 'Finalizada', 'Pedido finalizado após contato com a equipe.');

-- =========================================================
-- CONSULTAS DE CONFERÊNCIA
-- Podem ser executadas para verificar se os dados foram inseridos.
-- =========================================================

SELECT * FROM peludos;
SELECT * FROM interessados;
SELECT * FROM pedidos_adocao;

-- Conferência do relacionamento entre solicitações, tutores e peludos.
SELECT
    pedidos_adocao.id AS pedido_id,
    interessados.nome AS tutor,
    peludos.nome AS peludo,
    pedidos_adocao.data_solicitacao,
    pedidos_adocao.status,
    pedidos_adocao.observacoes
FROM pedidos_adocao
INNER JOIN interessados
    ON pedidos_adocao.interessado_id = interessados.id
INNER JOIN peludos
    ON pedidos_adocao.peludo_id = peludos.id
ORDER BY pedidos_adocao.id DESC;
