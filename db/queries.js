const pool = require('./pool');

async function getAllUsernames() {
  const { rows } = await pool.query('SELECT * FROM messages');
  return rows;
}

async function getUsername(id) {
  const { rows } = await pool.query(`SELECT * FROM messages WHERE id = ${id}`);
  return rows[0];
}

async function insertMessage(username, message, date) {
  await pool.query('INSERT INTO messages (username, message, date) VALUES ($1, $2, $3)', [
    username,
    message,
    date,
  ]);
}

module.exports = {
  getAllUsernames,
  getUsername,
  insertMessage,
};
