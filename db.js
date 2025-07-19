const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./tasks.db');

function initializeDB() {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    category TEXT,
    completed INTEGER,
    user_id INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);
}

module.exports = { db, initializeDB };
