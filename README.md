# Cafofo dos Peludos

Projeto desenvolvido para a **Avaliação N2 da disciplina de Programação Web**.

O **Cafofo dos Peludos** é uma aplicação web para gerenciamento de adoções de animais. O sistema possui páginas públicas para visualização dos peludos disponíveis e uma área administrativa protegida por login para gerenciar peludos, tutores, solicitações de adoção, dashboard e relatório.

## Tecnologias utilizadas

### Front-end

* React
* React Router DOM
* JavaScript
* CSS
* localStorage

### Back-end

* Node.js
* Express
* MySQL
* mysql2
* cors
* dotenv

## Funcionalidades principais

### Login

* Login simulado com e-mail e senha.
* Validação de campos obrigatórios.
* Controle de sessão com localStorage.
* Logout funcional.
* Proteção das rotas administrativas.

Credenciais de teste:

```txt
E-mail: teste@cafofo.com
Senha: 123456
```

### CRUD de Peludos

Tela:

```txt
/pets
```

Funcionalidades:

* cadastro de peludos;
* listagem dos peludos cadastrados;
* edição de dados;
* exclusão de registros;
* filtros por busca, tipo e status.

### CRUD de Tutores

Tela:

```txt
/tutores
```

Funcionalidades:

* cadastro de tutores/interessados;
* listagem dos tutores cadastrados;
* edição de dados;
* exclusão de registros;
* filtros por busca e cidade.

### CRUD de Solicitações

Tela:

```txt
/solicitacoes
```

Funcionalidades:

* cadastro de solicitações de adoção;
* relacionamento entre tutor e peludo;
* listagem das solicitações cadastradas;
* edição do status da solicitação;
* exclusão de registros;
* filtros por busca e status.

### Dashboard

Tela:

```txt
/dashboard
```

Funcionalidades:

* resumo das solicitações cadastradas;
* contagem de solicitações por status;
* exibição de solicitações recentes.

### Relatório

Tela:

```txt
/relatorio
```

O relatório exibe dados relacionados entre:

* solicitações de adoção;
* tutores/interessados;
* peludos.

Ele apresenta informações como tutor, peludo, data da solicitação, status e observações.

## Páginas públicas

```txt
/
/home
/peludos
/como-adotar
/feiras
/faq
/login
```

A página `/peludos` permite que visitantes visualizem os peludos disponíveis e enviem interesse por adoção.

## Páginas administrativas

```txt
/dashboard
/pets
/tutores
/solicitacoes
/relatorio
```

As páginas administrativas são protegidas por login.

## Banco de dados

O projeto utiliza MySQL.

Tabelas principais:

```txt
peludos
interessados
pedidos_adocao
```

O script do banco está localizado em:

```txt
banco/script_banco.sql
```

## Observação sobre imagens

As imagens dos peludos não são armazenadas no MySQL.

O banco salva apenas os dados principais dos peludos. As imagens são controladas no front-end com localStorage e associadas ao id do peludo por meio do arquivo:

```txt
src/utilitarios/storage.js
```

## Como executar o projeto

### 1. Instalar dependências do front-end

Na pasta principal do projeto:

```bash
npm install
```

### 2. Instalar dependências do back-end

Entre na pasta do back-end:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

### 3. Configurar o banco de dados

Execute o arquivo SQL no MySQL:

```txt
banco/script_banco.sql
```

### 4. Configurar o `.env`

Na pasta `backend`, crie um arquivo `.env` com base no `.env.example`.

Exemplo:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=cafofo_dos_peludos
DB_PORT=3306
PORT=3001
```

### 5. Rodar o back-end

Dentro da pasta `backend`:

```bash
npm run dev
```

### 6. Rodar o front-end

Na pasta principal do projeto:

```bash
npm start
```

## Relação com os requisitos da avaliação

O projeto possui:

* sistema de login;
* controle de sessão;
* logout;
* proteção de rotas;
* três CRUDs completos;
* uso de `useState`;
* uso de `map()` nas listagens;
* persistência dos dados;
* relatório com dados relacionados entre entidades;
* código separado em páginas, componentes e utilitários.
