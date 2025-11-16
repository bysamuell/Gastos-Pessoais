const db = require('../models/database');

const expensesController = {
  listar: (req, res) => {
    const userId = req.usuario.id;
    const { mes } = req.query; // formato esperado: YYYY-MM

    let sql = 'SELECT * FROM expenses WHERE userId = ?';
    const params = [userId];

    if (mes) {
      sql += ' AND strftime("%Y-%m", date) = ?';
      params.push(mes);
    }

    db.all(sql, params, (err, rows) => {
      if (err) {
        return res.status(500).json({ mensagem: 'Erro ao buscar despesas.' });
      }
      return res.json(rows);
    });
  },

  criar: (req, res) => {
    const userId = req.usuario.id;
    const { category, value, date, description } = req.body;

    if (!category || !value || !date) {
      return res
        .status(400)
        .json({ mensagem: 'Categoria, valor e data são obrigatórios.' });
    }

    const sql =
      'INSERT INTO expenses (userId, category, value, date, description) VALUES (?, ?, ?, ?, ?)';
    const params = [userId, category, value, date, description || null];

    db.run(sql, params, function (err) {
      if (err) {
        return res.status(500).json({ mensagem: 'Erro ao criar despesa.' });
      }

      return res.status(201).json({
        id: this.lastID,
        userId,
        category,
        value,
        date,
        description: description || null,
      });
    });
  },

  atualizar: (req, res) => {
    const userId = req.usuario.id;
    const { id } = req.params;
    const { category, value, date, description } = req.body;

    const sqlVerifica = 'SELECT * FROM expenses WHERE id = ? AND userId = ?';

    db.get(sqlVerifica, [id, userId], (err, expense) => {
      if (err) {
        return res.status(500).json({ mensagem: 'Erro ao buscar despesa.' });
      }

      if (!expense) {
        return res.status(404).json({ mensagem: 'Despesa não encontrada.' });
      }

      const sqlUpdate =
        'UPDATE expenses SET category = ?, value = ?, date = ?, description = ? WHERE id = ? AND userId = ?';
      const params = [
        category || expense.category,
        value ?? expense.value,
        date || expense.date,
        description ?? expense.description,
        id,
        userId,
      ];

      db.run(sqlUpdate, params, function (updateErr) {
        if (updateErr) {
          return res.status(500).json({ mensagem: 'Erro ao atualizar despesa.' });
        }

        return res.json({
          id: Number(id),
          userId,
          category: category || expense.category,
          value: value ?? expense.value,
          date: date || expense.date,
          description: description ?? expense.description,
        });
      });
    });
  },

  remover: (req, res) => {
    const userId = req.usuario.id;
    const { id } = req.params;

    const sql = 'DELETE FROM expenses WHERE id = ? AND userId = ?';

    db.run(sql, [id, userId], function (err) {
      if (err) {
        return res.status(500).json({ mensagem: 'Erro ao remover despesa.' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ mensagem: 'Despesa não encontrada.' });
      }

      return res.status(204).send();
    });
  },

  exportarCsv: (req, res) => {
    const userId = req.usuario.id;
    const { mes } = req.query; // formato esperado: YYYY-MM

    let sql = 'SELECT * FROM expenses WHERE userId = ?';
    const params = [userId];

    if (mes) {
      sql += ' AND strftime("%Y-%m", date) = ?';
      params.push(mes);
    }

    db.all(sql, params, (err, rows) => {
      if (err) {
        return res.status(500).json({ mensagem: 'Erro ao buscar despesas.' });
      }

      const header = 'id,userId,category,value,date,description';
      const lines = rows.map((r) => {
        const desc = r.description ? String(r.description).replace(/"/g, '""') : '';
        return [r.id, r.userId, r.category, r.value, r.date, `"${desc}"`].join(',');
      });

      const csv = [header, ...lines].join('\n');

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="expenses.csv"');
      return res.send(csv);
    });
  },
};

module.exports = expensesController;
