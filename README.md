# FinApp — frontend

Aplicação React/Vite para consumir a API do Sistema de Ajuda Financeira.

## Executar localmente

1. Inicie o PostgreSQL e crie o banco `sistema_financeiro`.
2. No diretório `Back-End-main`, configure `DB_HOST`, `DB_PORT`, `DB_NAME`,
   `DB_USER` e `DB_PASSWORD` se os valores padrão não forem adequados; execute:
   ```powershell
   .\mvnw.cmd spring-boot:run
   ```
3. No diretório `Front-end-main`, copie `.env.example` para `.env.local` se
   precisar alterar a URL da API e instale/inicie o frontend:
   ```powershell
   npm install
   npm run dev
   ```
4. Acesse `http://localhost:5173`. A API padrão é
   `http://localhost:8080/api`; o Swagger fica em
   `http://localhost:8080/api/swagger-ui.html`.

O cadastro e o login armazenam o token JWT da API; o token é enviado como
`Authorization: Bearer ...` nas requisições. As rotas `/painel` e
`/movimentacoes` exigem uma sessão válida. O CRUD da tela de movimentações usa
`/transacoes` e é vinculado ao usuário autenticado.

Para apontar para outra API, defina `VITE_API_URL` (por exemplo,
`VITE_API_URL=https://api.exemplo.com/api`) no ambiente de build do Vite. O
backend também precisa permitir a origem do frontend, definindo
`APP_CORS_ALLOWED_ORIGINS` (aceita origens separadas por vírgula).
