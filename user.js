const { db } = require('./db');

async function login(prompt) {
  const username = await prompt('Enter your username: ');

  return new Promise((resolve, reject) => {
    db.get(`SELECT id FROM users WHERE username = ?`, [username], (err, row) => {
      if (err) return reject(err);

      if (row) {
        console.log(`Welcome back, ${username}!`);
        resolve({ id: row.id, username });
      } else {
        db.run(`INSERT INTO users (username) VALUES (?)`, [username], function (err) {
          if (err) return reject(err);
          console.log(`New user created. Welcome, ${username}!`);
          resolve({ id: this.lastID, username });
        });
      }
    });
  });
}

module.exports = { login };
