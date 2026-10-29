# 🐾 Cafofo dos Peludos

Aplicação web **full stack** para gerenciamento de adoções de animais, com páginas públicas para visitantes e uma área administrativa protegida por login para gerenciar peludos, tutores e solicitações de adoção.

Projeto desenvolvido para a **Avaliação N2 da disciplina de Programação Web** (Ciência da Computação — UCB).

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-Supertest-C21325?logo=jest&logoColor=white)
![Cypress](https://img.shields.io/badge/Cypress-E2E-69D3A7?logo=cypress&logoColor=white)

---

## Destaques

- **Três CRUDs completos** (peludos, tutores e solicitações de adoção) com filtros de busca.
- **API REST** em Node.js/Express com banco MySQL relacional (chaves estrangeiras entre tutores, peludos e pedidos).
- **Dashboard** com indicadores de solicitações por status e **relatório** com dados relacionados entre as entidades (JOIN).
- **Rotas administrativas protegidas** por login, com controle de sessão e logout.
- **Testes automatizados** de integração (Jest + Supertest) e de sistema E2E (Cypress), aplicando técnicas de partição de equivalência e análise de valor-limite.

---

## Tecnologias utilizadas

| Camada | Tecnologias |
|---|---|
| Front-end | React, React Router DOM, JavaScript, CSS, Bootstrap |
| Back-end | Node.js, Express, mysql2, cors, dotenv |
| Banco de dados | MySQL |
| Testes | Jest, Supertest, Cypress |

---

## Funcionalidades

### Área pública

| Rota | Descrição |
|---|---|
| `/` e `/home` | Página inicial |
| `/peludos` | Peludos disponíveis, com envio de interesse por adoção |
| `/como-adotar` | Passo a passo da adoção |
| `/feiras` | Feiras de adoção |
| `/faq` | Perguntas frequentes |
| `/login` | Acesso à área administrativa |

### Área administrativa (protegida por login)

| Rota | Funcionalidades |
|---|---|
| `/dashboard` | Resumo das solicitações, contagem por status e solicitações recentes |
| `/pets` | CRUD de peludos, com filtros por busca, tipo e status |
| `/tutores` | CRUD de tutores/interessados, com filtros por busca e cidade |
| `/solicitacoes` | CRUD de solicitações de adoção (relaciona tutor e peludo), com edição de status e filtros |
| `/relatorio` | Relatório com tutor, peludo, data da solicitação, status e observações |

**Login:** simulado no front-end, com validação de campos obrigatórios, controle de sessão via `localStorage`, logout e proteção das rotas administrativas (`PrivateRoute`).

Credenciais de teste:

```txt
E-mail: teste@cafofo.com
Senha: 123456
```

---

## API REST

Base URL: `http://localhost:3001/api`

| Recurso | Endpoints |
|---|---|
| `/peludos` | `GET /` · `GET /:id` · `POST /` · `PUT /:id` · `DELETE /:id` |
| `/interessados` | `GET /` · `GET /:id` · `POST /` · `PUT /:id` · `DELETE /:id` |
| `/pedidos` | `GET /` · `GET /:id` · `POST /` · `PUT /:id` · `DELETE /:id` |
| `/relatorio` | `GET /` · `GET /:id` · `GET /indicadores/resumo` |

---

## Banco de dados

Banco MySQL `cafofo_dos_peludos`, com três tabelas principais:

| Tabela | Conteúdo |
|---|---|
| `peludos` | Dados dos animais disponíveis para adoção |
| `interessados` | Tutores/interessados em adotar |
| `pedidos_adocao` | Solicitações de adoção, com chaves estrangeiras para `interessados` e `peludos` |

O script de criação está em `banco/script_banco_cafofo.sql`.

> **Sobre as imagens:** as fotos dos peludos não são armazenadas no MySQL. O banco guarda apenas os dados principais; as imagens são controladas no front-end via `localStorage` e associadas ao `id` do peludo em `src/utilitarios/storage.js`.

---

## Testes

O projeto tem duas camadas de testes automatizados: **integração** (API + banco) e **sistema** (fluxo completo no navegador).

### Testes de integração — Jest + Supertest (7 casos)

Executam requisições reais na API e validam as respostas e a persistência no MySQL.

| Arquivo | Caso de teste | Técnica | Resultado esperado |
|---|---|---|---|
| `peludos.test.js` | Cadastro de peludo com dados válidos | Caminho feliz | `201` + mensagem de sucesso |
| `peludos.test.js` | Nome com 260 caracteres (acima do limite do `VARCHAR`) | Valor-limite | Erro (`≥ 400`), sem gravar no banco |
| `interessados.test.js` | Cadastro com todos os campos obrigatórios | Partição de equivalência (classe válida) | `200/201` + `id` do registro |
| `interessados.test.js` | Cadastro sem e-mail | Partição de equivalência (classe inválida) | `400` + mensagem de erro |
| `pedido.test.js` | Listagem de pedidos | Caminho feliz | `200` |
| `pedido.test.js` | Pedido sem data | Partição de equivalência (classe inválida) | `400` |
| `pedido.test.js` | Carregamento do relatório (JOIN entre tabelas) | Integração entre entidades | `200` |

### Testes de sistema (E2E) — Cypress (4 casos)

Simulam o uso real: fazem login com as credenciais de teste e percorrem o CRUD de tutores pela interface.

| # | Caso de teste | Resultado esperado |
|---|---|---|
| 1 | Envio do formulário vazio | Alerta de erro: campos obrigatórios |
| 2 | Cadastro de um interessado | Alerta de sucesso: interessado cadastrado |
| 3 | Edição do interessado cadastrado | Alerta de sucesso: registro atualizado |
| 4 | Exclusão do interessado | Alerta de sucesso: registro excluído |

### Como executar os testes

> Os testes usam o banco MySQL real. Antes de rodá-los, configure o banco e o `.env` (ver [Como executar o projeto](#como-executar-o-projeto)).

**Integração (pasta `backend`):**

```bash
cd backend
npm test                 # executa os testes
npm run test:coverage    # executa e gera o relatório de cobertura
```

**E2E (pasta principal):** com o back-end e o front-end rodando:

```bash
npx cypress open   # modo interativo
npx cypress run    # modo headless (terminal)
```

> Se o Cypress ainda não estiver instalado na máquina: `npm install --save-dev cypress`.

---

## Como executar o projeto

**Pré-requisitos:** Node.js e MySQL instalados.

### 1. Clonar o repositório

```bash
git clone https://github.com/diegoomarcelo/Cafofo_dos_peludos.git
cd Cafofo_dos_peludos
```

### 2. Instalar as dependências

```bash
npm install            # front-end (pasta principal)
cd backend
npm install            # back-end
```

### 3. Criar o banco de dados

Execute no MySQL o script `banco/script_banco_cafofo.sql`.

### 4. Configurar o `.env`

Na pasta `backend`, crie um arquivo `.env` com base no `env.example`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=cafofo_dos_peludos
DB_PORT=3306
PORT=3001
```

### 5. Rodar o back-end

```bash
cd backend
npm run dev
```

### 6. Rodar o front-end

Em outro terminal, na pasta principal:

```bash
npm start
```

A aplicação abre em `http://localhost:3000` e a API responde em `http://localhost:3001`.

---

## Estrutura do projeto

```txt
Cafofo_dos_peludos/
├── backend/
│   ├── rotas/          # Rotas da API (peludos, interessados, pedidos, relatório)
│   ├── tests/          # Testes de integração (Jest + Supertest)
│   ├── conexao.js      # Conexão com o MySQL
│   └── server.js       # Servidor Express
├── banco/
│   └── script_banco_cafofo.sql
├── cypress/
│   └── e2e/            # Testes de sistema (Cypress)
└── src/
    ├── componentes/    # Layout, Navbar e PrivateRoute
    ├── paginas/        # Páginas públicas e administrativas
    └── utilitarios/    # Controle de imagens no localStorage
```

---

## Requisitos da avaliação atendidos

- Sistema de login, controle de sessão, logout e proteção de rotas
- Três CRUDs completos com persistência dos dados
- Relatório com dados relacionados entre entidades
- Uso de `useState` e de `map()` nas listagens
- Código organizado em páginas, componentes e utilitários
- Testes automatizados de integração e de sistema

---

## Autor

**Diego Marcelo de Sousa** — Estudante de Ciência da Computação (UCB)

[LinkedIn](https://www.linkedin.com/in/diegomarcelo) · [GitHub](https://github.com/diegoomarcelo)
