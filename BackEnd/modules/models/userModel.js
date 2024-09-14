const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./users.db');

// Створення користувача
const createUser = (username, email, password) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.run(sql, [username, email, password], function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, username, email });
    });
  });
};

// Отримання користувача за email або username
const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE email = ? OR username = ?';
    db.get(sql, [email, email], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};

module.exports = { createUser, getUserByEmail };
