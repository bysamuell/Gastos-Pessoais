# Dashboard de Gastos Pessoais 💸

Um mini-sistema completo (backend + frontend) para controlar gastos pessoais, com:

- Autenticação (registro, login, JWT)
- Cadastro e listagem de despesas
- Filtro por mês
- Cálculo de total mensal
- Exportação de despesas em CSV
- Dashboard com gráfico por categoria

A ideia é ser um projeto simples, mas bem estruturado, para você usar como base de estudos ou como um MVP de controle financeiro pessoal.

---

## Tecnologias

### Backend

- **Node.js**
- **Express**
- **SQLite** (banco de dados leve em arquivo)
- **JWT (jsonwebtoken)** – autenticação via token
- **bcryptjs** – hash de senha
- **dotenv** – variáveis de ambiente
- **cors** – liberar o acesso do frontend

Estrutura de pastas do backend:

```text
backend/
  src/
    server.js
    routes/
      authRoutes.js
      expensesRoutes.js
    controllers/
      authController.js
      expensesController.js
    models/
      database.js
      userModel.js
      expenseModel.js
    middleware/
      authMiddleware.js