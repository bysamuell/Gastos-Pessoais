const expenseModel = {
  tableName: 'expenses',
  columns: {
    id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
    userId: 'INTEGER NOT NULL',
    category: 'TEXT NOT NULL',
    value: 'REAL NOT NULL',
    date: 'TEXT NOT NULL',
    description: 'TEXT',
  },
};

module.exports = expenseModel;
