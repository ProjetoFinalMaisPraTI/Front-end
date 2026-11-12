# FinApp - Frontend

Frontend do Sistema de Ajuda Financeira, uma aplicação para visualizar e
organizar movimentações financeiras pessoais. A interface conecta-se à API
backend para autenticação e gerenciamento de transações.

## Funcionalidades

- Página inicial com apresentação do FinApp.
- Páginas informativas: **Sobre** e **Contato**.
- Cadastro e login de usuários.
- Painel com resumo de despesas, ganhos e saldo, além de gráficos por período.
- Gerenciamento de movimentações: listar, adicionar, editar e excluir despesas
  e ganhos.
- Interface em português, com valores formatados em reais.

## Tecnologias

- **React 19**
- **Vite 8** para desenvolvimento e build
- **React Router 7** para navegação
- **Axios** para chamadas HTTP à API
- **Lucide React** para ícones
- **CSS** para estilos e layout
- **ESLint** para análise estática

## Pré-requisitos

- Node.js e npm
- Backend do FinApp em execução para usar cadastro, login, painel e
  movimentações
- PostgreSQL configurado para o backend

O guia de execução e documentação dos endpoints do backend estão no
[repositório da API](https://github.com/ProjetoFinalMaisPraTI/Back-End).

## Executar localmente no Windows

1. Inicie o PostgreSQL e o backend, seguindo as instruções do repositório da
   [API](https://github.com/ProjetoFinalMaisPraTI/Back-End).
2. Abra um terminal na pasta `Front-end` deste repositório.
3. Instale as dependências e inicie o Vite:

   ```cmd
   npm install
   npm run dev
   ```

4. Abra o endereço exibido no terminal, normalmente
   [http://localhost:5173](http://localhost:5173).

Para parar o servidor de desenvolvimento, pressione `Ctrl+C` no terminal.

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor Vite para desenvolvimento |
| `npm run build` | Gera a versão de produção em `dist/` |
| `npm run preview` | Serve localmente o build de produção |
| `npm run lint` | Executa o ESLint |

## Páginas e navegação

| Caminho | Página |
|---|---|
| `/` | Página inicial |
| `/sobre` | Sobre o projeto |
| `/contato` | Contato |
| `/criar-conta` | Cadastro |
| `/entrar` | Login |
| `/painel` | Resumo financeiro |
| `/movimentacoes` | Lista e gerenciamento de despesas e ganhos |

## Integração com a API

A URL base está configurada em `src/services/api.js` como
`http://localhost:8080/api`. Se o backend estiver em outro endereço, atualize
essa configuração no código.

O fluxo normal da aplicação é:

1. O cadastro envia nome, e-mail e senha para `POST /auth/registrar`.
2. O usuário entra com e-mail e senha por `POST /auth/login`.
3. A resposta do login é armazenada no `localStorage`.
4. O serviço Axios inclui o token JWT no cabeçalho `Authorization: Bearer ...`.
5. O painel e a página de movimentações consultam e alteram os dados por meio
   dos endpoints `/transacoes` do backend.

O endereço local usa **HTTP**. HTTPS depende de uma implantação com TLS. Para
que o navegador permita as chamadas locais, mantenha o backend configurado para
aceitar a origem `http://localhost:5173`.

## Roteiro sugerido para a apresentação

1. Abra a página inicial e apresente o objetivo do FinApp.
2. Mostre o cadastro e entre com uma conta de demonstração.
3. No painel, explique os totais de ganhos, despesas e saldo e alterne o
   período do gráfico.
4. Em **Movimentações**, alterne entre despesas e ganhos.
5. Adicione uma movimentação de demonstração e mostre como editar ou excluir
   um item.

Antes de apresentar, confirme que o PostgreSQL e a API estão ativos, que o
frontend abre em `localhost:5173` e que a conta de demonstração consegue entrar.
