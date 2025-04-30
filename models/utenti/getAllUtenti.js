const db = require('../../db');

const getAllUtenti = async ({ limit, offset }) => {
  return db('utenti').select('*').limit(limit).offset(offset);
};

module.exports = getAllUtenti;
