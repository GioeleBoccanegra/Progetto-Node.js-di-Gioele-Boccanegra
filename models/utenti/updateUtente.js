const db = require('../../db');

const updateUtente = async (id, { nome, cognome, email }) => {
  const rowsAffected = await db('utenti').where('id', id).update({ nome, cognome, email });
  return rowsAffected;
};

module.exports = updateUtente;
