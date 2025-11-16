const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/database');

const JWT_SECRET = process.env.JWT_SECRET || 'teste.153';

const authController = {
  registrar: (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ mensagem: 'Nome, e-mail e senha são obrigatórios.' });
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    const sql = 'INSERT INTO users (name, email, passwordHash) VALUES (?, ?, ?)';
    const params = [name, email, passwordHash];

    db.run(sql, params, function (err) {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          return res.status(400).json({ mensagem: 'E-mail já cadastrado.' });
        }
        return res.status(500).json({ mensagem: 'Erro ao registrar usuário.' });
      }

      return res.status(201).json({
        id: this.lastID,
        name,
        email,
      });
    });
  },

  login: (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ mensagem: 'E-mail e senha são obrigatórios.' });
    }

    const sql = 'SELECT * FROM users WHERE email = ?';
    db.get(sql, [email], (err, user) => {
      if (err) {
        return res.status(500).json({ mensagem: 'Erro ao buscar usuário.' });
      }

      if (!user) {
        return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
      }

      const senhaCorreta = bcrypt.compareSync(password, user.passwordHash);
      if (!senhaCorreta) {
        return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: '8h',
      });

      return res.json({
        token,
        usuario: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    });
  },
};

module.exports = authController;
