 require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./models/database');
const authRoutes = require('./routes/authRoutes');
const expensesRoutes = require('./routes/expensesRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API de Gastos Pessoais em execução' });
});

app.use('/auth', authRoutes);
app.use('/expenses', expensesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
