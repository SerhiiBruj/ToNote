const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./users.db');

// Запис даних в базу
const writeEntriesToDatabase = (decoded, clientTime) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE email = ?', [decoded.email], (err, row) => {
      if (err) return reject(err);
      if (!row) return reject('Користувача не знайдено');
      
      const sql = 'INSERT INTO entries (user_id, username, email, entry_date, client_time) VALUES (?, ?, ?, ?, ?)';
      db.run(sql, [row.id, decoded.username, decoded.email, new Date(), clientTime], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  });
};

module.exports = { writeEntriesToDatabase };
