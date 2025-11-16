const userModel = {
  tableName: 'users',
  columns: {
    id: 'INTEGER PRIMARY KEY AUTOINCREMENT',
    name: 'TEXT NOT NULL',
    email: 'TEXT NOT NULL UNIQUE',
    passwordHash: 'TEXT NOT NULL',
  },
};

module.exports = userModel;
